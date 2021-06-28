const SHA256 = require("crypto-js/sha256");

class CryptoBlock {
  constructor(index, timestamp, data, precedingHash = " ", nonce = 0) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.precedingHash = precedingHash;
    this.nonce = nonce;
    this.hash = this.computeHash();
  }
  computeHash() {
    return SHA256(
      this.index +
        this.precedingHash +
        //this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }
  mineBlock(difficulty) {
    let computeMoreThanOne = false;
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.computeHash();
      computeMoreThanOne = true;
    }
    return computeMoreThanOne;
  }
}

module.exports = CryptoBlock;
