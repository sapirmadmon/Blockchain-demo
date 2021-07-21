const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const SHA256 = require("crypto-js/sha256");

class Signature {
    constructor(message, prKey, puKey, signature, seq = 1, isVerify) {
        this.message = message;
        this.prKey = prKey;
        this.puKey = puKey;
        this.signature = signature;
        this.seq = seq;
        this.isVerify = isVerify; //this.ifVerify();
    }

    ifVerify() {
        try {
            const hashMsg = SHA256(this.message).toString();

            return ec
                .keyFromPublic(this.puKey, "hex")
                .verify(hashMsg, this.signature);
        } catch (error) {
            return false;
        }
    }
}

module.exports = Signature;