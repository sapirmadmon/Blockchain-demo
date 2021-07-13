const signatureContent = require("../model/signatureSchema");

const updateSignature = async function(signature, id2) {
    const filter = { id: id2 };
    const update = {...signature };
    const response = await signatureContent.findOneAndUpdate(filter, update);
};

module.exports = updateSignature;