const ctrlWrapper = require("../../helpers/ctrlWrapper");
const register = require("./userRegister");
const login = require("./userLogin");
const logout = require("./userLogout");
const getCurrentUser = require("./userCurrent");
const userSubscription = require("./userSubscription");
const updateAvatar = require("./updateAvatar");
const verificationUser = require("./verificationUser");
const resendVerification = require("./resendVerification");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  userSubscription: ctrlWrapper(userSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  verificationUser: ctrlWrapper(verificationUser),
  resendVerification: ctrlWrapper(resendVerification),
};
