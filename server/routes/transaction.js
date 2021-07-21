const express = require("express");
const router = express.Router();
const Signature = require("../public-private-keys/signature");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const signatureContent = require("../model/signatureSchema");
const updateSign = require("../DB/updateSignature");
const id = "transaction";
const SHA256 = require("crypto-js/sha256");

function verifySignature(message, messageSign, publicKey) {
    let ifVerify;
    try {
        const hashMsg = SHA256(message).toString();

        ifVerify = ec.keyFromPublic(publicKey, "hex").verify(hashMsg, messageSign);
    } catch (error) {
        ifVerify = false;
    }
    console.log("verify: ", ifVerify);
    return ifVerify;
}

router.get("/transaction/initTransaction", async(req, res) => {
    const key = ec.genKeyPair();

    const privateKey = key.getPrivate("hex");
    const fromPublicKey = ec
        .keyFromPrivate(privateKey)
        .getPublic("hex")
        .toString();

    const toPublicKey = ec.genKeyPair().getPublic("hex");
    const message = ["20", fromPublicKey, toPublicKey];

    const signature = new Signature(
        JSON.stringify(message),
        privateKey,
        fromPublicKey,
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
        message: message,
        prKey: signature.prKey,
    });
});

router.post("/transaction/getPublicKey", async(req, res) => {
    const privateKey = req.body.prKey;

    const publicKey = ec.keyFromPrivate(privateKey).getPublic("hex").toString();

    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        puKey: publicKey,
    });
});

router.post("/transaction/sign", async(req, res) => {
    const message = req.body.message;
    const privateKey = req.body.prKey;
    const publicKey = ec.keyFromPrivate(privateKey).getPublic("hex").toString();

    const hashMsg = SHA256(message).toString();
    const messageSign = ec
        .keyFromPrivate(privateKey)
        .sign(hashMsg, "base64")
        .toDER("hex");

    const signature = new Signature(
        JSON.stringify(message),
        privateKey,
        publicKey,
        messageSign
    );

    updateSign(signature, id);

    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        puKey: publicKey,
        signature: messageSign,
    });
});

router.post("/transaction/verify", async(req, res) => {
    const message = req.body.message;
    const publicKey = req.body.puKey;
    const messageSign = req.body.signature;

    const ifVerify = verifySignature(message, messageSign, publicKey);
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        ifVerify: ifVerify,
        message: message,
        signature: messageSign,
    });
});

module.exports = { router, verifySignature };