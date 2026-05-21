const { otpmailTemplate } = require("../helpers/emailTemplate");
const { mailsender } = require("../helpers/mailService");
const {
  isvalidEmail,
  isvalidPassword,
  generateOTP,
} = require("../helpers/utils");
const userSchema = require("../models/userSchema");

// registration/SignUp
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
    const otpExpiary = Date.now() + 5 * 60 * 1000;
    await userSchema.create({ fullName, email, password, otp, otpExpiary });
    await mailsender({
      email,
      subject: "Verify your OTP",
      template: otpmailTemplate(otp, otpExpiary),
    });
    return res
      .status(201)
      .send({ message: "Registration successful, verify your email" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server error!" });
  }
};

//otp verification
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {

    if (!email) return res.status(400).send({ message: "Email is required !" });
    if (!otp) return res.status(400).send({ message: "Otp code is required !" });

    const userData = await userSchema.findOne({ email, isvarified: false });

    if (!userData)
       return res.status(400).send({ message: "User not found" });
    if (userData.otp != otp)
      return res.status(400).send({ message: "Invalid Otp" });
    if (userData.otpExpiary < Date.now())
      return res.status(400).send({ message: "Otp Expired" });

    userData.otp = null;
    userData.isvarified = true;
    userData.otpExpiary = null;
    await userData.save();

    res.status(200).send({ message: "Email verification successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "email verification failed" });
  }
};

//resend otp 
const resendOtp = async (req,res) =>{
  const {email} = req.body;
  try {
    const userData = await userSchema.findOne({email, isvarified:false});
    if (!userData) return res.status(400).send({message:"User not found"});
    
    const otp = generateOTP();
    userData.otp= otp
    userData.otpExpiary = Date.now() + 5 * 60 * 1000;
    await userData.save()
    await mailsender({
      email,
      subject: "Verify your OTP",
      template: otpmailTemplate(otp, userData.otpExpiary),
    });

    res.status(200).send({message: "New OTP send to your email"})

  } catch (error) {
    res.status(400).send({message:"Failed to resend OTP !"})
  }
}

module.exports = { registration , verifyOtp, resendOtp};
