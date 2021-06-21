const express = require("express");
const router = express.Router();
const websiteContent = require("../model/webSchema");
const upload = require("../middleware/upload");
const fs = require("fs");
const CryptoBlock = require("../blockchain/block");
const CryptoBlockchain = require("../blockchain/cryptoBlockchain");
const { json } = require("body-parser");
let blockchain = new CryptoBlockchain();

blockchain.addNewBlock(new CryptoBlock(2, "01/06/2020", ""));
blockchain.addNewBlock(new CryptoBlock(3, "01/06/2020", ""));
blockchain.addNewBlock(new CryptoBlock(4, "01/06/2020", ""));
blockchain.addNewBlock(new CryptoBlock(5, "01/06/2020", ""));

router.get("/blockchain/blockchain", async(req, res) => {
    //const blockchain = new CryptoBlockchain();
    res.header("Access-Control-Allow-Origin", "*");
    //blockchain.changeBlockchain();
    res.send(blockchain);
});

router.post("/blockchain/blockchain", (req, res) => {
    //const index = req.body.index;
    //const data = req.body.data;
    //if (block === undefined) {
    //    block = new CryptoBlock("1", Date.now(), "");
    //    block.mineBlock(3);
    const newBlock = req.body.newBlock;
    blockchain.changeBlockchain(newBlock);
    //changeBlockchain(blockchain);
    res.header("Access-Control-Allow-Origin", "*");
    res.send(blockchain);
});

router.post("/blockchain/blockchain/mine", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const newBlock = req.body.newBlock;
    console.log(newBlock);
    blockchain.mineBlockchain(newBlock);
    res.send(blockchain);
});

module.exports = router;