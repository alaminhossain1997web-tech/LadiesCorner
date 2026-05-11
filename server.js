
const express = require("express");
const app = express();


//for DNS server problem
 const dns = require("dns");
 dns.setServers(['8.8.8.8', '8.8.4.4']);

const router = require("./routes");
const dbConfig = require("./configs/dbConfig");

require('dotenv').config(); 

dbConfig()

app.use("/", router);

app.listen(8000, () => {
    console.log("server is running");
});