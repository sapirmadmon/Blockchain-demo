const express = require("express");
const router = express.Router();
const websiteContent = require("./model/webSchema");
const upload = require("./middleware/upload");
const CryptoBlock = require("./blockchain/block");
const diffculty = 3;
let block;

router.post("/blockchain/hash", (req, res) => {
  const data = req.body.data;
  const block = new CryptoBlock(0, 0, data);
  const hash = block.hash;
  res.header("Access-Control-Allow-Origin", "*");
  res.send(hash);
});

router.get("/blockchain/initBlock", async (req, res) => {
  const index = "1";
  block = new CryptoBlock(index, Date.now(), "");
  block.mineBlock(diffculty);
  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    index: block.index,
    nonce: block.nonce,
    data: block.data,
    hash: block.hash,
  });
});

router.post("/blockchain/block", (req, res) => {
  const index = req.body.index;
  const data = req.body.data;

  if (index !== block.index || data !== block.data) {
    block = new CryptoBlock(index, Date.now(), data);
    block.mineBlock(diffculty);
  }

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
  block.mineBlock(diffculty);

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    index: block.index,
    nonce: block.nonce,
    data: block.data,
    hash: block.hash,
  });
});

/*
router.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/../Frontend/public/index.html");
  });
  
  router.get("/getAll", async (req, res) => {
    const data = await websiteContent.find({});
    res.header("Access-Control-Allow-Origin", "*");
    res.send(data);
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

router.delete("/delete/:cityName", async (req, res) => {
  const myquery = { cityName: req.params.cityName };
  const data = await websiteContent.find(myquery);
  if (data) {
    fs.unlink(
      process.cwd() + "/../Frontend/public/uploads/" + data[0].filePath,
      function (err) {
        if (err) throw err;
        console.log("File deleted!");
      }
    );

    await websiteContent.deleteMany(myquery, function (err, obj) {
      console.log("document deleted..");
    });
  } else {
  }
});
*/
module.exports = router;
