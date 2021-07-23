const CryptoBlock = require("./block");

class CryptoBlockchain {
  constructor() {
    this.blockchain = [this.startGenesisBlock()];
  }

  startGenesisBlock() {
    const firstBlock = new CryptoBlock("1", "01/06/2020", "", "0");
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
    let stopCheckIfMine = false;

    console.log("after assign change data");
    console.log();
    console.log("data after chagne: ", this.blockchain[newBlock.numBlock].data);
    console.log();
    console.log(this.blockchain[newBlock.numBlock]);
    console.log();
    console.log();

    for (let i = newBlock.numBlock; i < this.blockchain.length; i++) {
      if (i === 0) {
        this.blockchain[i].precedingHash = "0";
        this.blockchain[i].hash = this.blockchain[i].computeHash();
      } else {
        this.blockchain[i].precedingHash = this.blockchain[i - 1].hash;
        this.blockchain[i].hash = this.blockchain[i].computeHash();
      }
      if (!stopCheckIfMine) {
        this.blockchain[i].checkIfBlockMine();
        console.log("block mine: ", this.blockchain[i].isMine);
        if (!this.blockchain[i].isMine) stopCheckIfMine = true;
      } else {
        this.blockchain[i].isMine = false;
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
      this.blockchain[i].checkIfBlockMine();
    }
  }
}

module.exports = CryptoBlockchain;
