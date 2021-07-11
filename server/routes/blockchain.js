const express = require("express");
const router = express.Router();
const CryptoBlock = require("../blockchain/block");
const CryptoBlockchain = require("../blockchain/cryptoBlockchain");

const blockchainContent = require("../model/blockchainSchema");
const { updateBlockchain, findBlockchainByIndex } = require("../DB/update");

const id = "blockchain";

const initBlockchain = () => {
    const blockchain = new CryptoBlockchain();

    for (let i = 2; i <= 5; i++) {
        const block = new CryptoBlock(i, "01/06/2020", "");
        blockchain.addNewBlock(block);
    }
    return blockchain;
};

const initBlockchainArr = (arrBlockchain) => {
    for (let i = 0; i < 4; i++) {
        arrBlockchain[i] = initBlockchain(i);
    }
};

router.get("/blockchain/initBlockchain", (req, res) => {
    const arrBlockchain = []; //array of all blockchain
    initBlockchainArr(arrBlockchain);
    const index = req.query.indexBlockchain;

    const cur_blockchain = arrBlockchain[index]; //current blockchain

    const content = new blockchainContent({
        ...cur_blockchain,
        id: id + index,
    });
    content.save().catch(() => {
        updateBlockchain(cur_blockchain, "blockchain" + index);
    });

    res.send(arrBlockchain[index]);
});

router.post("/blockchain/getBlockchain", async(req, res) => {
    const newBlock = req.body.newBlock;
    const indexBlockchain = req.body.indexBlockchain;
    const cur_blockchain = new CryptoBlockchain();
    cur_blockchain.initBlockchain(
        await findBlockchainByIndex("blockchain" + indexBlockchain)
    );
    cur_blockchain.changeBlockchain(newBlock);

    updateBlockchain(cur_blockchain, "blockchain" + indexBlockchain);

    res.send(cur_blockchain);
});

router.post("/blockchain/mine", async(req, res) => {
    const indexBlockchain = req.body.indexBlockchain;
    const newBlock = req.body.newBlock;
    arrBlockchain[indexBlockchain].mineBlockchain(newBlock);

    const cur_blockchain = arrBlockchain[indexBlockchain];
    await updateBlockchain(cur_blockchain, "blockchain" + indexBlockchain);

    res.send(arrBlockchain[indexBlockchain]);
});

module.exports = router;