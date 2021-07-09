const blockContent = require("../model/blockSchema");

//async function updateBlock(block, id2) {
//    const filter = { id: id2 };
//    const update = {...block };
//    const response = await blockContent.findOneAndUpdate(filter, update);
//    console.log(response);
//}

var updateBlock = async function(block, id2) {
    const filter = { id: id2 };
    const update = {...block };
    const response = await blockContent.findOneAndUpdate(filter, update);
    console.log(response);
};

module.exports = updateBlock;