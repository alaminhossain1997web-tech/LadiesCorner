const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const cloudinary = require("../configs/cloudinaryConfig");

const isvalidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

const isvalidPassword = (password) => {
  const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
  return passwordPattern.test(password);
};
//random encrypted OTP generate inbuild mathod
const generateOTP = () => {
  return crypto.randomInt(1000, 10000).toString();
};

//accesstoken
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SEC,
    { expiresIn: "1h" },
  );
};
// refreshToken

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SEC,
    { expiresIn: "15d" },
  );
};

const uploadtoClodinary = async ({ mimetype, imgBuffer }) => {
  const dataUrl = `data:${mimetype};base64,${imgBuffer.toString("base64")}`;
  const res = await cloudinary.uploader.upload(dataUrl);
  return res.secure_url;
};
const distroyFromCloudinary = (url) => {
  const publicId = url.split("/").pop().split(".").shift();

  cloudinary.uploader.destroy(publicId, (error, result) => {
    if (error) {
      console.log("distroy from cloudinary", error);
    }
  });
};

module.exports = {
  isvalidEmail,
  isvalidPassword,
  generateOTP,
  generateAccessToken,
  generateRefreshToken,
  uploadtoClodinary,
  distroyFromCloudinary,
};
