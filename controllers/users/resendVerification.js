const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");
require("dotenv").config();

const { LOCAL_SERVER } = process.env;

const resendVerification = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw HttpError(400, "Missing required field email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${LOCAL_SERVER}/api/users/verify/${user.verificationToken}">Click to verify your email</a> `,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = resendVerification;
