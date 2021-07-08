const express = require("express");
const router = express.Router();
const blockContent = require("../model/blockSchema");
const CryptoBlock = require("../blockchain/block");
let block;
const diffculty = 3;

async function updateBlcok(block, id) {
  const filter = { id: id };
  const update = { ...block };
  const response = await blockContent.findOneAndUpdate(filter, update);
  console.log(response);
}

router.get("/block/initBlock", async (req, res) => {
  const index = "1";
  block = new CryptoBlock(index, Date.now(), "");
  block.mineBlock(diffculty);
  console.log(block);
  const content = new blockContent({
    ...block,
    id: id,
  });
  content.save().catch(() => {
    updateBlcok(block, "block");
  });

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    index: block.index,
    nonce: block.nonce,
    data: block.data,
    hash: block.hash,
    isMine: block.isMine,
  });
});

router.post("/block/getBlock", async (req, res) => {
  const index = req.body.index;
  const data = req.body.data;
  const nonce = req.body.nonce;

  block = new CryptoBlock(index, Date.now(), data, "", nonce);
  block.checkIfBlockMine();
  updateBlcok(block, "block");

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    index: block.index,
    nonce: block.nonce,
    data: block.data,
    hash: block.hash,
    isMine: block.isMine,
  });
});

router.post("/block/mine", async (req, res) => {
  const index = req.body.index;
  const data = req.body.data;
  block = new CryptoBlock(index, Date.now(), data);
  block.mineBlock(diffculty);

  updateBlcok(block, "block");

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    index: block.index,
    nonce: block.nonce,
    data: block.data,
    hash: block.hash,
    isMine: block.isMine,
  });
});

module.exports = router;
