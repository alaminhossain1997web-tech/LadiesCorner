const express = require("express");
const route = express.Router();

const authRoute = require("./authRoute");

route.get("/", (req, res) => {
    res.send("hello from server");
});

route.use("/auth", authRoute);

module.exports = route;

//mongodb+srv://ladiescorner:YRrq0FXs7AoWcsKm@cluster0.rswnbmr.mongodb.net/ladiescorner?appName=Cluster0
//password://YRrq0FXs7AoWcsKm