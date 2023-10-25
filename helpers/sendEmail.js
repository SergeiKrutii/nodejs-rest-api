const nodemailer = require("nodemailer");
require("dotenv").config();

const { SECRET_PASSWORD_GMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "seruyilol@gmail.com",
    pass: SECRET_PASSWORD_GMAIL,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "seruyilol@gmail.com" };
  transport
    .sendMail(email)
    .then(() => console.log("Email sending succes"))
    .catch((error) => console.log(error));
};

module.exports = sendEmail;
