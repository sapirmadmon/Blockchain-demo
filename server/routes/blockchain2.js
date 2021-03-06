const express = require("express");
const router = express.Router();
const CryptoBlock = require("../blockchain/block");
const CryptoBlockchain = require("../blockchain/cryptoBlockchain");
const blockchainContent = require("../model/blockchainSchema");
const { updateBlockchain } = require("../DB/update");
const SHA256 = require("crypto-js/sha256");
const { verifySignature } = require("./transaction");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const id = "blockchain2-";
const arrBlockchain = []; //array of blockchain2

const signTx = (price, puKey, prKey) => {
  const toPublicKey = ec.genKeyPair().getPublic("hex");
  const message = [price, puKey, toPublicKey, "1"];

  const hashMsg = SHA256(JSON.stringify(message)).toString();
  const signature = ec
    .keyFromPrivate(prKey)
    .sign(hashMsg, "base64")
    .toDER("hex");

  const isVerify = verifySignature(message, signature, puKey);
  return [message, signature, isVerify, prKey, puKey];
};

const initTxPerBlock = () => {
  const arrTX = [];
  const key = ec.genKeyPair();

  const privateKey = key.getPrivate("hex");
  const fromPublicKey = ec
    .keyFromPrivate(privateKey)
    .getPublic("hex")
    .toString();

  arrTX.push(["100", fromPublicKey]);
  for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
    //number of tx is between 1-4
    let price = Math.floor(Math.random() * 100) + 1 + ""; //price between 1-100
    arrTX.push(signTx(price, fromPublicKey, privateKey));
  }

  return arrTX;
};

const initWithTX = () => {
  const blockchain = new CryptoBlockchain();
  let block;
  const pubKey = ec.genKeyPair().getPublic("hex");

  //coinbase - init for first block
  blockchain.blockchain[0].index = "1";
  blockchain.blockchain[0].data = [];
  blockchain.blockchain[0].data.push(["100", pubKey]);
  blockchain.blockchain[0].nonce = 0;
  blockchain.blockchain[0].hash = blockchain.blockchain[0].computeHash();
  blockchain.blockchain[0].mineBlock(3);

  for (let i = 2; i <= 5; i++) {
    const arrTx = initTxPerBlock();
    block = new CryptoBlock(i + "", "01/06/2020", arrTx);
    blockchain.addNewBlock(block);
  }
  return blockchain;
};

const initBlockchainArrTX = (index) => {
  arrBlockchain[index] = initWithTX();
};

router.get("/blockchain2/initBlockchain", (req, res) => {
  const index = req.query.indexBlockchain;
  initBlockchainArrTX(index);
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

router.post("/blockchain2/getBlockchain", (req, res) => {
  const newBlock = req.body.newBlock;
  const indexBlockchain = req.body.indexBlockchain;
  const indexTx = req.body.indexTx;
  const cur_blockchain = arrBlockchain[indexBlockchain];

  if (newBlock.numBlock > 0) {
    const firstTX = cur_blockchain.blockchain[newBlock.numBlock].data[1];
    const prKey = firstTX[3];
    const puKey = firstTX[4];

    newBlock.data = [...newBlock.data].map((data, index) => {
      if (index > 0) {
        data.push(prKey, puKey);
      }
      return data;
    });
  }

  if (indexTx) {
    const arrTx = newBlock.data[indexTx];
    const isVerify = verifySignature(arrTx[0], arrTx[1], arrTx[4]);
    newBlock.data[indexTx][2] = isVerify;
  }

  cur_blockchain.changeBlockchain(newBlock);

  updateBlockchain(cur_blockchain, id + indexBlockchain);

  res.send(cur_blockchain);
});

router.post("/blockchain2/mine", (req, res) => {
  const newBlock = req.body.newBlock;
  const indexBlockchain = req.body.indexBlockchain;
  const cur_blockchain = arrBlockchain[indexBlockchain];

  cur_blockchain.mineBlockchain(newBlock);

  updateBlockchain(cur_blockchain, id + indexBlockchain);

  res.send(cur_blockchain);
});

module.exports = router;
