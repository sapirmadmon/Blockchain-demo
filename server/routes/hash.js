const express = require("express");
const router = express.Router();
const CryptoBlock = require("../blockchain/block");
const blockContent = require("../model/blockSchema");
const updateBlock = require("../DB/update");

const id = "hash";

//async function updateHash(block, id2) {
//    const filter = { id: id2 };
//    const update = {...block };
//    const response = await blockContent.findOneAndUpdate(filter, update);
//    console.log(response);
//}

router.post("/hash", (req, res) => {
    const data = req.body.data;
    const block = new CryptoBlock(0, 0, data);
    const hash = block.hash;

    const content = new blockContent({
        ...block,
        id: id,
    });
    content.save().catch(() => {
        //updateHash(block, id);
        updateBlock(block, id);
    });

    res.header("Access-Control-Allow-Origin", "*");
    res.send(hash);
});

module.exports = router;