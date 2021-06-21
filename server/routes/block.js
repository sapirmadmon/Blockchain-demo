const express = require("express");
const router = express.Router();
const websiteContent = require("../model/webSchema");
const upload = require("../middleware/upload");
const fs = require("fs");
const CryptoBlock = require("../blockchain/block");
let block;

router.get("/blockchain/block", async(req, res) => {
    const block = new CryptoBlock("1", Date.now(), "");
    block.mineBlock(3);
    //const data = await websiteContent.find({});
    res.header("Access-Control-Allow-Origin", "*");
    res.send(block);
});

router.post("/blockchain/block", (req, res) => {
    const index = req.body.index;
    const data = req.body.data;

    if (block === undefined) {
        block = new CryptoBlock("1", Date.now(), "");
        block.mineBlock(3);
    } else if (index !== block.index || data !== block.data) {
        block = new CryptoBlock(index, Date.now(), data);
        block.mineBlock(3);
    }

    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        index: block.index,
        nonce: block.nonce,
        data: block.data,
        hash: block.hash,
    });
});

router.post("/blockchain/block/mine", (req, res) => {
    const index = req.body.index;
    const data = req.body.data;
    block = new CryptoBlock(index, Date.now(), data);
    block.mineBlock(3);

    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        index: block.index,
        nonce: block.nonce,
        data: block.data,
        hash: block.hash,
    });
});

module.exports = router;