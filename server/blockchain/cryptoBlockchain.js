const CryptoBlock = require("./block");

class CryptoBlockchain {
  constructor() {
    this.blockchain = [this.startGenesisBlock()];
  }
  startGenesisBlock() {
    const firstBlock = new CryptoBlock(1, "01/01/2020", "", "0");
    firstBlock.mineBlock(3);
    return firstBlock;
  }
  obtainLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }
  addNewBlock(newBlock) {
    newBlock.precedingHash = this.obtainLatestBlock().hash;
    newBlock.mineBlock(3);
    this.blockchain.push(newBlock);
  }

  changeBlockchain(newBlock) {
    this.blockchain[newBlock.numBlock].data = newBlock.data;
    this.blockchain[newBlock.numBlock].index = newBlock.index;
    this.blockchain[newBlock.numBlock].nonce = newBlock.nonce;
    for (let i = newBlock.numBlock; i < this.blockchain.length; i++) {
      if (i === 0) {
        this.blockchain[i].precedingHash = 0;
        this.blockchain[i].hash = this.blockchain[i].computeHash();
      } else {
        this.blockchain[i].precedingHash = this.blockchain[i - 1].hash;
        this.blockchain[i].hash = this.blockchain[i].computeHash();
      }
    }
  }

  mineBlockchain(newBlock) {
    this.blockchain[newBlock.numBlock].data = newBlock.data;
    this.blockchain[newBlock.numBlock].index = newBlock.index;
    this.blockchain[newBlock.numBlock].nonce = 0;
    const computeMoreThanOne = this.blockchain[newBlock.numBlock].mineBlock(3);
    if (!computeMoreThanOne) {
      this.blockchain[newBlock.numBlock].nonce = newBlock.nonce;
    }

    for (let i = newBlock.numBlock + 1; i < this.blockchain.length; i++) {
      this.blockchain[i].precedingHash = this.blockchain[i - 1].hash;
      this.blockchain[i].hash = this.blockchain[i].computeHash();
    }
  }
}

module.exports = CryptoBlockchain;
