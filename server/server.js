const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const websiteContent = require("./model/webSchema");
const blockContent = require("./model/blockSchema");
const initDB = require("./init.json");
const cors = require("cors");
require("dotenv").config();

// app config
const router = require("./routes/route");
const routerHash = require("./routes/hash");
const routerBlock = require("./routes/block");
const routerBlockchain = require("./routes/blockchain");

app = express();
app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(
    express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(express.static(process.cwd() + "/../Frontend"));
app.use("/uploads", express.static("uploads"));
//routers
app.use((req, res, next) => next(), router);
app.use((req, res, next) => next(), routerHash);
app.use((req, res, next) => next(), routerBlock);
app.use((req, res, next) => next(), routerBlockchain);

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
    initDB["websiteContent"].map((record) => {
        const page = new websiteContent(record);
        page
            .save()
            .then()
            .catch((err) => console.log("duplicate key"));
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});