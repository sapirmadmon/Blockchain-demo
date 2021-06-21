const express = require("express");
const router = express.Router();
const websiteContent = require("../model/webSchema");
const upload = require("../middleware/upload");
const fs = require("fs");
const CryptoBlock = require("../blockchain/block");

router.post("/blockchain/hash", (req, res) => {
    const data = req.body.data;
    const block = new CryptoBlock(0, 0, data);
    const hash = block.hash;
    res.header("Access-Control-Allow-Origin", "*");
    res.send(hash);
});


module.exports = router;