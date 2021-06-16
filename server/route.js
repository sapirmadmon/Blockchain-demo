const express = require("express");
const router = express.Router();
const websiteContent = require("./model/webSchema");
const upload = require("./middleware/upload");
const fs = require("fs");
const CryptoBlock = require("./blockchain/block");
let block;

router.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/../Frontend/public/index.html");
});

router.get("/getAll", async(req, res) => {
    const data = await websiteContent.find({});
    res.header("Access-Control-Allow-Origin", "*");
    res.send(data);
});

router.post("/blockchain/hash", (req, res) => {
    const data = req.body.data;
    const block = new CryptoBlock(0, 0, data);
    const hash = block.hash;
    res.header("Access-Control-Allow-Origin", "*");
    res.send(hash);
});

router.get("/blockchain/block", async(req, res) => {
    const block = new CryptoBlock("1", Date.now(), "");
    block.mineBlock(3);
    //const data = await websiteContent.find({});
    res.header("Access-Control-Allow-Origin", "*");
    res.send(block);
});

router.post("/blockchain/block", (req, res) => {
    const index = req.body.index;
    //const nonce = req.body.nonce;
    const data = req.body.data;

    if (block === undefined) {
        block = new CryptoBlock("1", Date.now(), "");
        block.mineBlock(3);
        console.log("if 1 ", block.nonce);
        console.log("if 1 ", block.hash);
    } else if (index !== block.index || data !== block.data) {
        block = new CryptoBlock(index, Date.now(), data);
        block.mineBlock(3);
        console.log("if 2 ", block.nonce);
        console.log("if 2 ", block.hash);
    }
    // } else if (block.nonce !== req.body.nonce) {
    //     block.nonce = req.body.nonce;
    //     block.hash = block.computeHash();
    //     console.log("if 3 ", block.nonce);
    //     console.log("if 3 ", block.hash);
    // }

    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        index: block.index,
        nonce: block.nonce,
        data: block.data,
        hash: block.hash,
    });
});

router.post("/blockchain/block/mine", (req, res) => {
    const index = req.body.index;
    const data = req.body.data;
    block = new CryptoBlock(index, Date.now(), data);
    block.mineBlock(3);

    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        index: block.index,
        nonce: block.nonce,
        data: block.data,
        hash: block.hash,
    });
});

router.post("/addWebsite", upload.single("image"), (req, res) => {
    const cityName = req.body.cityName;
    const description = req.body.description;
    const coords = req.body.coords;
    const filename = req.file.filename;
    const obj = {
        cityName: cityName,
        description: description,
        coords: coords,
        filePath: filename,
    };
    console.log("before insert", obj);
    const content = new websiteContent(obj);
    content.save();
    res.header("Access-Control-Allow-Origin", "*");
    res.send(`Full name is:${cityName} ${description}.`);
});

router.delete("/delete/:cityName", async(req, res) => {
    const myquery = { cityName: req.params.cityName };
    const data = await websiteContent.find(myquery);
    if (data) {
        fs.unlink(
            process.cwd() + "/../Frontend/public/uploads/" + data[0].filePath,
            function(err) {
                if (err) throw err;
                console.log("File deleted!");
            }
        );

        await websiteContent.deleteMany(myquery, function(err, obj) {
            console.log("document deleted..");
        });
    } else {}
});

module.exports = router;