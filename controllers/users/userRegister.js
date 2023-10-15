const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409);
  }

  const createHashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: createHashPassword,
    avatarUrl,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: "starter",
    },
  });
};

module.exports = register;
