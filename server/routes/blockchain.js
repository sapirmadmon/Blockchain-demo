const express = require("express");
const router = express.Router();
const CryptoBlock = require("../blockchain/block");
const CryptoBlockchain = require("../blockchain/cryptoBlockchain");
let blockchain;
router.get("/blockchain/initBlockchain", (req, res) => {
  blockchain = new CryptoBlockchain();

  blockchain.addNewBlock(new CryptoBlock(2, "01/06/2020", ""));
  blockchain.addNewBlock(new CryptoBlock(3, "01/06/2020", ""));
  blockchain.addNewBlock(new CryptoBlock(4, "01/06/2020", ""));
  blockchain.addNewBlock(new CryptoBlock(5, "01/06/2020", ""));
  res.header("Access-Control-Allow-Origin", "*");
  res.send(blockchain);
});

router.post("/blockchain/getBlockchain", (req, res) => {
  const newBlock = req.body.newBlock;
  blockchain.changeBlockchain(newBlock);
  res.header("Access-Control-Allow-Origin", "*");
  res.send(blockchain);
});

router.post("/blockchain/mine", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const newBlock = req.body.newBlock;
  console.log(newBlock);
  blockchain.mineBlockchain(newBlock);
  res.send(blockchain);
});

module.exports = router;
