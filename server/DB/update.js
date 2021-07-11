const blockContent = require("../model/blockSchema");
const blockchainContent = require("../model/blockchainSchema");

const findBlockchainByIndex = async function(indexBlockchain) {
    const filter = { id: indexBlockchain };
    return await blockchainContent.findOne(filter);
};

const updateBlock = async function(block, id2) {
    const filter = { id: id2 };
    const update = {...block };
    const response = await blockContent.findOneAndUpdate(filter, update);
};

const updateBlockchain = async function(blockchain, id2) {
    const filter = { id: id2 };
    const update = {...blockchain };
    const response = await blockchainContent.findOneAndUpdate(filter, update);
};

module.exports = { updateBlock, updateBlockchain, findBlockchainByIndex };