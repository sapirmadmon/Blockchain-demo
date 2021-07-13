const express = require("express");
const router = express.Router();
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

router.post("/keys/publicKey", async(req, res) => {
    const privateKey = req.body.prKey;
    const publicKey = ec.keyFromPrivate(privateKey).getPublic("hex").toString();

    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        prKey: privateKey,
        puKey: publicKey,
    });
});
module.exports = router;