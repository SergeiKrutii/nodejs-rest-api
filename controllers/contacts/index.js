const addContact = require("./addContact");
const deleteContact = require("./deleteContact");
const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const updateContact = require("./updateContact");
const updateStatusContact = require("./updateStatusContact");
const { ctrlWrapper } = require("../../helpers");

module.exports = {
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
