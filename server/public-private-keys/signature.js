class Signature {
    constructor(massage, prKey, puKey, signature) {
        this.massage = massage;
        this.prKey = prKey;
        this.puKey = puKey;
        this.signature = signature;
    }
}

module.exports = Signature;