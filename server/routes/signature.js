const express = require("express");
const router = express.Router();
const Signature = require("../public-private-keys/signature");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const signatureContent = require("../model/signatureSchema");
const updateSign = require("../DB/updateSignature");
const id = "signature";
const SHA256 = require("crypto-js/sha256");

router.get("/signature/initSignature", async (req, res) => {
  const key = ec.genKeyPair();

  const signature = new Signature(
    "",
    key.getPrivate("hex"),
    key.getPublic("hex"),
    ""
  );

  const content = new signatureContent({
    ...signature,
    id: id,
  });
  content.save().catch(() => {
    updateSign(signature, id);
  });

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    prKey: signature.prKey,
    puKey: signature.puKey,
  });
});

//should get private key from the body and create public key
router.post("/signature/sign", async (req, res) => {
  const key = ec.genKeyPair();
  const massage = req.body.message;
  const privateKey = key.getPrivate("hex"); //req.body.prKey;
  const publicKey = ec.keyFromPrivate(privateKey).getPublic("hex").toString();

  const hashMsg = SHA256(massage).toString();
  const messageSign = ec.sign(hashMsg, "base64").toDER("hex");

  console.log("messageSign: ", messageSign);

  const signature = new Signature(massage, privateKey, publicKey, messageSign);

  updateSign(signature, id);

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    massage: massage,
    puKey: publicKey,
    signature: messageSign,
  });
});

router.post("/signature/verify", async (req, res) => {
  //const key = ec.genKeyPair();
  const massage = req.body.message;
  const privateKey = req.body.prKey;
  const publicKey = ec.keyFromPrivate(privateKey).getPublic("hex").toString();
  const messageSign = req.body.signature;

  const ifVerify = ec
    .keyFromPublic(publicKey, "hex")
    .verify(massage, messageSign);

  console.log("ifVerify: ", ifVerify);

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    ifVerify: ifVerify,
    massage: massage,
    puKey: publicKey,
    signature: messageSign,
  });
});

module.exports = router;
