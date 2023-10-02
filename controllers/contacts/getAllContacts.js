const { Contact } = require("../../models/contacts");

const getAllContacts = async (req, res) => {
  const { page = 1, limit = 20, favorite = true } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ favorite }, "", { skip, limit });
  res.json(result);
};

module.exports = getAllContacts;
