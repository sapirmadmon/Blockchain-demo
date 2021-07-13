const mongoose = require("mongoose");

const SignatureSchema = new mongoose.Schema({
    massage: {
        type: String,
        required: false,
        unique: true,
    },
    prKey: {
        type: String,
        required: false,
    },
    puKey: {
        type: String,
        require: false,
    },
    signature: {
        type: String,
        require: false,
    },
});

module.exports = mongoose.model("signatureContent", SignatureSchema);