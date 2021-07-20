class Signature {
  constructor(message, prKey, puKey, signature, seq = 1) {
    this.message = message;
    this.prKey = prKey;
    this.puKey = puKey;
    this.signature = signature;
    this.seq = seq;
  }
}

module.exports = Signature;
