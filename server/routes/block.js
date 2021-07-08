const express = require("express");
const router = express.Router();
const blockContent = require("../model/blockSchema");
const CryptoBlock = require("../blockchain/block");
const { ObjectId } = require("mongodb");
let block;
const diffculty = 3;
let id;

router.get("/block/initBlock", async(req, res) => {
    const index = "1";
    block = new CryptoBlock(index, Date.now(), "");
    block.mineBlock(diffculty);

    const content = new blockContent({
        ...block,
        _id: ObjectId(id),
        upsert: true,
    });

    const response = await content.update();
    id = response._id;

    //content.save();
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        index: block.index,
        nonce: block.nonce,
        data: block.data,
        hash: block.hash,
        isMine: block.isMine,
    });
});

router.post("/block/getBlock", (req, res) => {
    const index = req.body.index;
    const data = req.body.data;
    const nonce = req.body.nonce;

    block = new CryptoBlock(index, Date.now(), data, " ", nonce);
    block.checkIfBlockMine();
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        index: block.index,
        nonce: block.nonce,
        data: block.data,
        hash: block.hash,
        isMine: block.isMine,
    });
});

router.post("/block/mine", (req, res) => {
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
        isMine: block.isMine,
    });
});

module.exports = router;