const { User } = require("../../models");

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json("No content");
};

module.exports = logout;
