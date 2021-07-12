const express = require("express");
const router = express.Router();
const CryptoBlock = require("../blockchain/block");
const CryptoBlockchain = require("../blockchain/cryptoBlockchain");

const blockchainContent = require("../model/blockchainSchema");
const { updateBlockchain, findBlockchainByIndex } = require("../DB/update");

const id = "blockchain";
const arrBlockchain = []; //array of all blockchain

const initBlockchain = () => {
  const blockchain = new CryptoBlockchain();
  let block;
  for (let i = 2; i <= 5; i++) {
    block = new CryptoBlock(i, "01/06/2020", "");
    blockchain.addNewBlock(block);
  }
  return blockchain;
};

const initBlockchainArr = () => {
  for (let i = 0; i < 4; i++) {
    arrBlockchain[i] = initBlockchain();
  }
};

const initWithTX = () => {
  const blockchain = new CryptoBlockchain();
  let block;
  for (let i = 2; i <= 5; i++) {
    block = new CryptoBlock(i, "01/06/2020", [
      [1, "andres", "sofia"],
      [3, "ash", "dan"],
    ]);
    blockchain.addNewBlock(block);
  }
  return blockchain;
};

const initBlockchainArrTX = () => {
  for (let i = 0; i < 3; i++) {
    arrBlockchain[i] = initWithTX();
  }
};

//need to replace data
router.get("/blockchain/initBlockchainCoinbase", (req, res) => {
  initBlockchainArrTX();
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

router.get("/blockchain/initBlockchainToken", (req, res) => {
  initBlockchainArrTX();
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
