const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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
    process.env.SEC_KEY,
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
    process.env.SEC_KEY,
    { expiresIn: "15d" },
  );
};
module.exports = {
  isvalidEmail,
  isvalidPassword,
  generateOTP,
  generateAccessToken,
  generateRefreshToken,
};
