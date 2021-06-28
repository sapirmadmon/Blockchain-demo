const express = require("express");
const router = express.Router();
const CryptoBlock = require("../blockchain/block");
const CryptoBlockchain = require("../blockchain/cryptoBlockchain");
let arrBlockchain = [];

const initBlockchainArr = () => {
  let blockchain;

  for (let i = 0; i < 4; i++) {
    blockchain = new CryptoBlockchain();

    blockchain.addNewBlock(new CryptoBlock(2, "01/06/2020", ""));
    blockchain.addNewBlock(new CryptoBlock(3, "01/06/2020", ""));
    blockchain.addNewBlock(new CryptoBlock(4, "01/06/2020", ""));
    blockchain.addNewBlock(new CryptoBlock(5, "01/06/2020", ""));
    arrBlockchain.push(blockchain);
  }
};
initBlockchainArr();

router.get("/blockchain/initBlockchain", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(arrBlockchain[0]);
});

router.get("/blockchain/distributed/initBlockchain", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send([arrBlockchain[1], arrBlockchain[2], arrBlockchain[3]]);
});

router.post("/blockchain/getBlockchain", (req, res) => {
  const newBlock = req.body.newBlock;
  const indexBlockchain = req.body.indexBlockchain;
  arrBlockchain[indexBlockchain].changeBlockchain(newBlock);
  res.header("Access-Control-Allow-Origin", "*");
  res.send(arrBlockchain[indexBlockchain]);
});

router.post("/blockchain/mine", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const indexBlockchain = req.body.indexBlockchain;
  const newBlock = req.body.newBlock;
  arrBlockchain[indexBlockchain].mineBlockchain(newBlock);
  res.send(arrBlockchain[indexBlockchain]);
});

module.exports = router;
