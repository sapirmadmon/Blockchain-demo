const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const websiteContent = require("./model/webSchema");
const blockContent = require("./model/blockSchema");
const blockchainContent = require("./model/blockchainSchema");
const signatureContent = require("./model/signatureSchema");
const cors = require("cors");
require("dotenv").config();

// app config
const routerHash = require("./routes/hash");
const routerBlock = require("./routes/block");
const routerBlockchain = require("./routes/blockchain");
const routerKeys = require("./routes/keys");
const routerSignature = require("./routes/signature");
const routerTransaction = require("./routes/transaction");

app = express();
app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(
    express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
//routers
app.use((req, res, next) => next(), routerHash);
app.use((req, res, next) => next(), routerBlock);
app.use((req, res, next) => next(), routerBlockchain);
app.use((req, res, next) => next(), routerKeys);
app.use((req, res, next) => next(), routerSignature);
app.use((req, res, next) => next(), routerTransaction);
// db config
mongoose.connect(
    process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => {
        console.log("connect to db...");
    }
);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
// db init with json file
db.once("open", async function callback() {
    await websiteContent.deleteMany();
    await blockContent.deleteMany();
    await blockchainContent.deleteMany();
    await signatureContent.deleteMany();
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});