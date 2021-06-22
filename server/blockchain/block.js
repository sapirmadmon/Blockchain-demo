const SHA256 = require("crypto-js/sha256");

class CryptoBlock {
  constructor(index, timestamp, data, precedingHash = " ", nonce = 0) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.precedingHash = precedingHash;
    this.hash = this.computeHash();
    this.nonce = nonce;
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
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      //console.log("into while");
      this.nonce++;
      this.hash = this.computeHash();
    }
    console.log("cur nonce: " + this.nonce);
  }
}

module.exports = CryptoBlock;
