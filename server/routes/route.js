const express = require("express");
const router = express.Router();
const websiteContent = require("../model/webSchema");
const upload = require("../middleware/upload");
const fs = require("fs");

router.post("/blockchainByIndex", upload.single("image"), (req, res) => {
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

module.exports = router;
