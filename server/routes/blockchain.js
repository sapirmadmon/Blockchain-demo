const express = require("express");
const router = express.Router();
//const blockContent = require("../model/blockSchema");
const CryptoBlock = require("../blockchain/block");
const CryptoBlockchain = require("../blockchain/cryptoBlockchain");

let arrBlockchain = []; //array of all blockchain
//const id = "blockchain";

const initBlockchain = (indexBlockchain) => {
    const blockchain = new CryptoBlockchain(indexBlockchain);

    for (let i = 2; i <= 5; i++) {
        const block = new CryptoBlock(i, "01/06/2020", "");
        blockchain.addNewBlock(block, indexBlockchain, i);
    }
    //blockchain.addNewBlock(new CryptoBlock(2, "01/06/2020", ""));
    //blockchain.addNewBlock(new CryptoBlock(3, "01/06/2020", ""));
    //blockchain.addNewBlock(new CryptoBlock(4, "01/06/2020", ""));
    //blockchain.addNewBlock(new CryptoBlock(5, "01/06/2020", ""));
    return blockchain;
};

const initBlockchainArr = () => {
    for (let i = 0; i < 4; i++) {
        arrBlockchain[i] = initBlockchain(i);
    }
};

router.get("/blockchain/initBlockchain", (req, res) => {
    initBlockchainArr();
    const index = req.query.indexBlockchain;

    res.send(arrBlockchain[index]);
});

router.post("/blockchain/getBlockchain", (req, res) => {
    const newBlock = req.body.newBlock;
    const indexBlockchain = req.body.indexBlockchain;
    arrBlockchain[indexBlockchain].changeBlockchain(newBlock, indexBlockchain);
    res.send(arrBlockchain[indexBlockchain]);
});

router.post("/blockchain/mine", (req, res) => {
    const indexBlockchain = req.body.indexBlockchain;
    const newBlock = req.body.newBlock;
    arrBlockchain[indexBlockchain].mineBlockchain(newBlock, indexBlockchain);
    res.send(arrBlockchain[indexBlockchain]);
});

module.exports = router;