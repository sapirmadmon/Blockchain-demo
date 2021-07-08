const express = require("express");
const router = express.Router();
const CryptoBlock = require("../blockchain/block");
const CryptoBlockchain = require("../blockchain/cryptoBlockchain");
let arrBlockchain = [];

async function updateBlcok(block, indexBlockchain, indexInblockChain) {
  let id = "blockchain" + indexBlockchain + "" + indexInblockChain;
  const update = { ...block };
  const response = await blockContent.findOneAndUpdate(filter, update);
  console.log(response);
}

const initBlockchain = () => {
  const blockchain = new CryptoBlockchain();

  blockchain.addNewBlock(new CryptoBlock(2, "01/06/2020", ""));
  blockchain.addNewBlock(new CryptoBlock(3, "01/06/2020", ""));
  blockchain.addNewBlock(new CryptoBlock(4, "01/06/2020", ""));
  blockchain.addNewBlock(new CryptoBlock(5, "01/06/2020", ""));
  return blockchain;
};

const initBlockchainArr = () => {
  for (let i = 0; i < 4; i++) {
    arrBlockchain[i] = initBlockchain();
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
  arrBlockchain[indexBlockchain].changeBlockchain(newBlock);
  res.send(arrBlockchain[indexBlockchain]);
});

router.post("/blockchain/mine", (req, res) => {
  const indexBlockchain = req.body.indexBlockchain;
  const newBlock = req.body.newBlock;
  arrBlockchain[indexBlockchain].mineBlockchain(newBlock);
  res.send(arrBlockchain[indexBlockchain]);
});

module.exports = router;
