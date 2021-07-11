const express = require("express");
const router = express.Router();
const blockContent = require("../model/blockSchema");
const CryptoBlock = require("../blockchain/block");
const { updateBlock } = require("../DB/update");

let block;
const diffculty = 3;
const id = "block";

router.get("/block/initBlock", async(req, res) => {
    const index = "1";
    block = new CryptoBlock(index, Date.now(), "");
    block.mineBlock(diffculty);
    console.log(block);
    const content = new blockContent({
        ...block,
        id: id,
    });
    content.save().catch(() => {
        updateBlock(block, id);
    });

    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        index: block.index,
        nonce: block.nonce,
        data: block.data,
        hash: block.hash,
        isMine: block.isMine,
    });
});

router.post("/block/getBlock", async(req, res) => {
    const index = req.body.index;
    const data = req.body.data;
    const nonce = req.body.nonce;

    block = new CryptoBlock(index, Date.now(), data, "", nonce);
    block.checkIfBlockMine();
    updateBlock(block, id);

    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        index: block.index,
        nonce: block.nonce,
        data: block.data,
        hash: block.hash,
        isMine: block.isMine,
    });
});

router.post("/block/mine", async(req, res) => {
    const index = req.body.index;
    const data = req.body.data;
    block = new CryptoBlock(index, Date.now(), data);
    block.mineBlock(diffculty);

    updateBlock(block, id);

    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        index: block.index,
        nonce: block.nonce,
        data: block.data,
        hash: block.hash,
        isMine: block.isMine,
    });
});

module.exports = router;