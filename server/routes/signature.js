const express = require("express");
const router = express.Router();
const Signature = require("../public-private-keys/signature");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const signatureContent = require("../model/signatureSchema");
const updateSign = require("../DB/updateSignature");
const id = "signature";

router.get("/signature/initSignature", async(req, res) => {
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

router.post("/signature/sign", async(req, res) => {
    const key = ec.genKeyPair();
    const massage = req.body.massage;
    const privateKey = req.body.prKey;
    const publicKey = ec.keyFromPrivate(privateKey).getPublic("hex").toString();

    const messageSign = key.sign(massage);
    console.log("messageSign: ", messageSign);

    const signature = new Signature(massage, privateKey, publicKey, messageSign);

    updateSign(signature, id);

    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        massage: massage,
        prKey: privateKey,
        signature: messageSign,
    });
});

module.exports = router;