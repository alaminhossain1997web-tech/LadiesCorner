const express = require("express");
const route = express.Router();

const { registration } = require("../controllers/authControllers");

route.post("/registration", registration);

module.exports = route;