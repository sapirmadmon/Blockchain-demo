class Signature {
    constructor(message, prKey, puKey, signature) {
        this.message = message;
        this.prKey = prKey;
        this.puKey = puKey;
        this.signature = signature;
    }
}

module.exports = Signature;