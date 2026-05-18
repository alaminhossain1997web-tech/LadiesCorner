const { otpmailTemplate } = require("../helpers/emailTemplate");
const { mailsender } = require("../helpers/mailService");
const { isvalidEmail, isvalidPassword, generateOTP } = require("../helpers/utils");
const userSchema = require("../models/userSchema");

const registration = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName?.trim())
      return res
        .status(400)
        .send({ message: "Fullname is required", field: "fullName" });
    if (!email)
      return res
        .status(400)
        .send({ message: "Email is required", field: "email" });
    if (!password)
      return res
        .status(400)
        .send({ message: "Password is required", field: "password" });
    if (!isvalidEmail(email))
      return res.status(400).send({ message: "Invalid Email", field: "email" });
    if (!isvalidPassword(password))
      return res
        .status(400)
        .send({ message: "Invalid Password", field: "password" });
    const existingEmail = await userSchema.findOne({ email });
    if (existingEmail)
      return res
        .status(400)
        .send({ message: "This Email already exist", field: "email" });
    const otp = generateOTP();
    const  otpExpiary =  Date.now()+5*60*1000
        await userSchema.create({fullName, email, password, otp, otpExpiary})
        await mailsender({
          email,
          subject: "Verify your OTP",
          template: otpmailTemplate(otp, otpExpiary),
        });
        return res.status(201).send({ message: "Registration successful, verify your email" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server error!" });
  }
};

module.exports = { registration };
