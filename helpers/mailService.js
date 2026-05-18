const nodemailer = require("nodemailer");

// create transporteer , for send a mail,


const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: "alaminhossain1997.web@gmail.com",
    pass: "cvzk hkng wrsm eirp",
  },
});
 
// mailsender 
const mailsender = async ({ email, subject, template}) => {
  try {
    await transporter.sendMail({
      from: '"Ladis Corner" <teamLadiesCorner@gmail.com>',
      to: email,
      subject: subject,
      html: template
      ,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
  module.exports = {mailsender}
