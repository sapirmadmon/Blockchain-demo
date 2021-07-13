const express = require("express");
const router = express.Router();
//const CryptoBlock = require("../blockchain/block");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

//const id = "keys";

router.get("/keys/initKeys", async(req, res) => {
    const key = ec.genKeyPair();
    const privateKey = key.getPrivate("hex");
    const publicKey = key.getPublic("hex");

    //  const content = new blockContent({
    //    ...block,
    //    id: id,
    //  });
    //  content.save().catch(() => {
    //    updateBlock(block, id);
    //  });

    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        prKey: privateKey,
        puKey: publicKey,
    });
});

//router.post("/keys/random", async (req, res) => {
//  const index = req.body.index;
//  const data = req.body.data;
//  const nonce = req.body.nonce;

//  block = new CryptoBlock(index, Date.now(), data, "", nonce);
//  block.checkIfBlockMine();
//  updateBlock(block, id);

//  res.header("Access-Control-Allow-Origin", "*");
//  res.json({
//    index: block.index,
//    nonce: block.nonce,
//    data: block.data,
//    hash: block.hash,
//    isMine: block.isMine,
//  });
//});

module.exports = router;