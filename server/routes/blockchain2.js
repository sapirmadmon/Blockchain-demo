const express = require("express");
const router = express.Router();
const CryptoBlock = require("../blockchain/block");
const CryptoBlockchain = require("../blockchain/cryptoBlockchain");
const Signature = require("../public-private-keys/signature");
const initDataCoinbase = require("../initDataCoinbase.json");
const blockchainContent = require("../model/blockchainSchema");
const { updateBlockchain, findBlockchainByIndex } = require("../DB/update");
const SHA256 = require("crypto-js/sha256");
const { verifySignature } = require("./transaction");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const id = "blockchain2-";
const arrBlockchain = []; //array of blockchain2

const signTx = (price, puKey, prKey) => {
  const toPublicKey = ec.genKeyPair().getPublic("hex");
  const message = [price, puKey, toPublicKey];

  const tx = new Signature(message, prKey, puKey, "");
  const hashMsg = SHA256(JSON.stringify(message)).toString();
  tx.signature = ec.keyFromPrivate(prKey).sign(hashMsg, "base64").toDER("hex");
  tx.isVerify = verifySignature("kjhiugyugyuguy", tx.signature, puKey); //tx.ifVerify();
  return tx;
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
    let price = Math.floor(Math.random() * 100) + 1; //price between 1-100
    arrTX.push(signTx(price, fromPublicKey, privateKey));
  }

  return arrTX;
};

const initWithTX = () => {
  const blockchain = new CryptoBlockchain();
  let block;
  const pubKey = ec.genKeyPair().getPublic("hex");
  //init for first block
  //const cb = new Signature(["100", pubKey, ""], "", "", ""); //coinbase
  blockchain.blockchain[0].data = [];
  blockchain.blockchain[0].data.push(["100", pubKey]);

  for (let i = 2; i <= 5; i++) {
    const arrTx = initTxPerBlock();
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

router.post("/blockchain2/getBlockchain", (req, res) => {
  const newBlock = req.body.newBlock;
  const indexBlockchain = req.body.indexBlockchain;
  const indexTX = req.query.indexTX;

  const cur_blockchain = arrBlockchain[indexBlockchain];
  cur_blockchain.changeBlockchain(newBlock);
  if (indexTX) {
    const { message, signature, puKey } =
      cur_blockchain.blockchain[newBlock.numBlock].data[indexTX];
    //console.log(message, signature, puKey);
    const isVerify = verifySignature(message, signature, puKey);
    console.log("isVerify: ", isVerify);
    cur_blockchain.blockchain[newBlock.numBlock].data[indexTX].isVerify =
      isVerify;
  }

  updateBlockchain(cur_blockchain, id + indexBlockchain);

  res.send(cur_blockchain);
});

router.post("/blockchain2/mine", (req, res) => {
  const indexBlockchain = req.body.indexBlockchain;
  const newBlock = req.body.newBlock;
  arrBlockchain[indexBlockchain].mineBlockchain(newBlock);

  const cur_blockchain = arrBlockchain[indexBlockchain];
  updateBlockchain(cur_blockchain, id + indexBlockchain);

  res.send(arrBlockchain[indexBlockchain]);
});

module.exports = router;
