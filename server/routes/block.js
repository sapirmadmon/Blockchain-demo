const express = require("express");
const router = express.Router();
const websiteContent = require("../model/webSchema");
const upload = require("../middleware/upload");
const fs = require("fs");
const CryptoBlock = require("../blockchain/block");
let block;
const diffculty = 3;


router.get("/blockchain/initBlock", async(req, res) => {
    const index = "1";
    block = new CryptoBlock(index, Date.now(), "");
    block.mineBlock(diffculty);
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        index: block.index,
        nonce: block.nonce,
        data: block.data,
        hash: block.hash,
    });
});

router.post("/blockchain/block", (req, res) => {
    const index = req.body.index;
    const data = req.body.data;

    if (index !== block.index || data !== block.data) {
        block = new CryptoBlock(index, Date.now(), data);
        block.mineBlock(diffculty);
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
    block.mineBlock(diffculty);

    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        index: block.index,
        nonce: block.nonce,
        data: block.data,
        hash: block.hash,
    });
});

module.exports = router;