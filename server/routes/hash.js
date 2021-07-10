const express = require("express");
const router = express.Router();
const CryptoBlock = require("../blockchain/block");
const blockContent = require("../model/blockSchema");
const updateBlock = require("../DB/update");

const id = "hash";

router.post("/hash", (req, res) => {
  const data = req.body.data;
  const block = new CryptoBlock(0, 0, data);
  const hash = block.hash;

  const content = new blockContent({
    ...block,
    id: id,
  });
  content.save().catch(() => {
    //updateHash(block, id);
    updateBlock(block, id);
  });

  res.header("Access-Control-Allow-Origin", "*");
  res.send(hash);
});

module.exports = router;
