const express = require("express");
const router = express.Router();
const CryptoBlock = require("../blockchain/block");
const CryptoBlockchain = require("../blockchain/cryptoBlockchain");
const initDBTokens = require("../initDataTokens.json");
const initDataCoinbase = require("../initDataCoinbase.json");
const blockchainContent = require("../model/blockchainSchema");
const { updateBlockchain, findBlockchainByIndex } = require("../DB/update");

const id = "blockchain";
const arrBlockchain = []; //array of all blockchain

const initBlockchain = () => {
  const blockchain = new CryptoBlockchain();
  let block;
  for (let i = 2; i <= 5; i++) {
    block = new CryptoBlock(i + "", "01/06/2020", "");
    blockchain.addNewBlock(block);
  }
  return blockchain;
};

const initBlockchainArr = (index) => {
  arrBlockchain[index] = initBlockchain();
};

const initWithTX = (initData) => {
  const blockchain = new CryptoBlockchain();
  let block;
  // we change data so we need compute mine block on the init
  blockchain.blockchain[0].data = initData["transactions"]["block1"];
  blockchain.blockchain[0].nonce = 0;
  blockchain.blockchain[0].hash = blockchain.blockchain[0].computeHash();
  blockchain.blockchain[0].mineBlock(3);

  for (let i = 2; i <= 5; i++) {
    block = new CryptoBlock(
      i + "",
      "01/06/2020",
      initData["transactions"]["block" + i + ""]
    );
    blockchain.addNewBlock(block);
  }
  return blockchain;
};

const initBlockchainArrTX = (initData, index) => {
  arrBlockchain[index] = initWithTX(initData);
};

//need to replace data
router.get("/blockchain/initBlockchainCoinbase", (req, res) => {
  const index = req.query.indexBlockchain;
  initBlockchainArrTX(initDataCoinbase, index);

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
  const index = req.query.indexBlockchain;
  initBlockchainArrTX(initDBTokens, index);

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
  const index = req.query.indexBlockchain;
  initBlockchainArr(req.query.indexBlockchain);

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
  console.log("before change data");
  console.log();
  console.log(cur_blockchain);
  console.log();

  console.log("data init: ", cur_blockchain.blockchain[newBlock.numBlock].data);

  console.log();

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
