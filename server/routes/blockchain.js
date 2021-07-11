const express = require("express");
const router = express.Router();
const CryptoBlock = require("../blockchain/block");
const CryptoBlockchain = require("../blockchain/cryptoBlockchain");

const blockchainContent = require("../model/blockchainSchema");
const { updateBlockchain, findBlockchainByIndex } = require("../DB/update");

const id = "blockchain";
const arrBlockchain = []; //array of all blockchain

const initBlockchain = (index) => {
    const blockchain = new CryptoBlockchain();
    let block;
    for (let i = 2; i <= 5; i++) {
        if (index < 4) {
            block = new CryptoBlock(i, "01/06/2020", "");
        } else {
            block = new CryptoBlock(i, "01/06/2020", [
                [1, "andres", "sofia"],
                [3, "ash", "dan"],
            ]);
        }
        blockchain.addNewBlock(block);
    }
    return blockchain;
};

const initBlockchainArr = (index) => {
    for (let i = 0; i < 4; i++) {
        arrBlockchain[i] = initBlockchain(index);
    }
};

router.get("/blockchain/initBlockchain", (req, res) => {
    initBlockchainArr(req.query.indexBlockchain);
    const index = req.query.indexBlockchain;

    const cur_blockchain = arrBlockchain[index]; //current blockchain

    const content = new blockchainContent({
        ...cur_blockchain,
        id: id + index,
    });
    content.save().catch(() => {
        updateBlockchain(cur_blockchain, id + index);
    });

    res.send(arrBlockchain[index]);
});

router.post("/blockchain/getBlockchain", (req, res) => {
    const newBlock = req.body.newBlock;
    const indexBlockchain = req.body.indexBlockchain;

    const cur_blockchain = arrBlockchain[indexBlockchain];
    cur_blockchain.changeBlockchain(newBlock);

    updateBlockchain(cur_blockchain, id + indexBlockchain);

    res.send(cur_blockchain);
});

router.post("/blockchain/mine", (req, res) => {
    const indexBlockchain = req.body.indexBlockchain;
    const newBlock = req.body.newBlock;
    arrBlockchain[indexBlockchain].mineBlockchain(newBlock);

    const cur_blockchain = arrBlockchain[indexBlockchain];
    updateBlockchain(cur_blockchain, id + indexBlockchain);

    res.send(arrBlockchain[indexBlockchain]);
});

module.exports = router;