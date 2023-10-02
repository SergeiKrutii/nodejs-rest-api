const ctrlWrapper = require("../../helpers/ctrlWrapper");
const register = require("../../controllers/users/userRegister");
const login = require("../../controllers/users/userLogin");
const logout = require("../../controllers/users/userLogout");
const getCurrentUser = require("../../controllers/users/userCurrent");
const userSubscription = require("../../controllers/users/userSubscription");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  userSubscription: ctrlWrapper(userSubscription),
};
