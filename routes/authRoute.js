const express = require("express");
const multer = require("multer");
const upload = multer();
const route = express.Router();

const { registration, verifyOtp, resendOtp, login, getProfile, updateProfile } = require("../controllers/authControllers");
const { authMiddleware } = require("../middleWare/authMiddleware");

route.post("/registration", registration);
route.post("/verifyotp", verifyOtp);
route.post("/resendotp", resendOtp);
route.post("/sign_up", login);
route.get("/getprofile",authMiddleware,getProfile)
route.put("/updateProfile",authMiddleware, upload.single("avatar"),updateProfile)
module.exports = route;
