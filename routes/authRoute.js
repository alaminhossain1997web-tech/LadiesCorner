const express = require("express");
const route = express.Router();

const { registration, verifyOtp, resendOtp } = require("../controllers/authControllers");

route.post("/registration", registration);
route.post("/verifyotp", verifyOtp);
route.post("/resendotp", resendOtp);

module.exports = route;
