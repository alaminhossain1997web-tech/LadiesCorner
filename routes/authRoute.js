const express = require("express");
const route = express.Router();

const { registration, verifyOtp, resendOtp, login } = require("../controllers/authControllers");

route.post("/registration", registration);
route.post("/verifyotp", verifyOtp);
route.post("/resendotp", resendOtp);
route.post("/sign_up", login);

module.exports = route;
