const express = require("express");
const router = express.Router();
const CryptoBlock = require("../blockchain/block");
const CryptoBlockchain = require("../blockchain/cryptoBlockchain");
const Signature = require("../public-private-keys/signature");
const initDataCoinbase = require("../initDataCoinbase.json");
const blockchainContent = require("../model/blockchainSchema");
const { updateBlockchain, findBlockchainByIndex } = require("../DB/update");
const SHA256 = require("crypto-js/sha256");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const id = "blockchain2";
const arrBlockchain = []; //array of blockchain2

const signTx = (price, puKey, prKey) => {
    const toPublicKey = ec.genKeyPair().getPublic("hex");
    const message = [price, puKey, toPublicKey];

    const tx = new Signature(JSON.stringify(message), prKey, puKey, "");
    const hashMsg = SHA256(message).toString();
    tx.signature = ec.keyFromPrivate(prKey).sign(hashMsg, "base64").toDER("hex");

    return tx;
};

const initTxPerBlock = () => {
    arrTX = [];
    const key = ec.genKeyPair();

    const privateKey = key.getPrivate("hex");
    const fromPublicKey = ec
        .keyFromPrivate(privateKey)
        .getPublic("hex")
        .toString();

    for (let i = 0; i < Math.floor(Math.random() * 4) + 1; i++) {
        //number of tx is between 1-4
        let price = Math.floor(Math.random() * 100) + 1; //price between 1-100
        arrTX.push(signTx(price, fromPublicKey, privateKey));
    }

    return arrTX;
};

const initWithTX = () => {
    const blockchain = new CryptoBlockchain();
    let block;
    //TODO init for first block
    //blockchain.blockchain[0].data = initData["transactions"]["block1"];
    for (let i = 2; i <= 5; i++) {
        let arrTx = initTxPerBlock();
        block = new CryptoBlock(i, "01/06/2020", arrTx);
        blockchain.addNewBlock(block);
    }
    return blockchain;
};

const initBlockchainArrTX = () => {
    for (let i = 0; i < 3; i++) {
        arrBlockchain[i] = initWithTX();
    }
};

router.get("/blockchain2/initBlockchain", (req, res) => {
    initBlockchainArrTX();
    //const index = req.query.indexBlockchain;

    //const cur_blockchain = arrBlockchain[index]; //current blockchain

    //const content = new blockchainContent({
    //    ...cur_blockchain,
    //    id: id + index,
    //});
    //content.save().catch(() => {
    //    updateBlockchain(cur_blockchain, id + index);
    //});

    res.send(arrBlockchain);
});

//router.post("/blockchain/getBlockchain", (req, res) => {
//    const newBlock = req.body.newBlock;
//    const indexBlockchain = req.body.indexBlockchain;

//    const cur_blockchain = arrBlockchain[indexBlockchain];
//    cur_blockchain.changeBlockchain(newBlock);

//    updateBlockchain(cur_blockchain, id + indexBlockchain);

//    res.send(cur_blockchain);
//});

//router.post("/blockchain/mine", (req, res) => {
//    const indexBlockchain = req.body.indexBlockchain;
//    const newBlock = req.body.newBlock;
//    arrBlockchain[indexBlockchain].mineBlockchain(newBlock);

//    const cur_blockchain = arrBlockchain[indexBlockchain];
//    updateBlockchain(cur_blockchain, id + indexBlockchain);

//    res.send(arrBlockchain[indexBlockchain]);
//});

module.exports = router;