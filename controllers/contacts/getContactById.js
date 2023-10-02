const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId);
  if (!contactById) {
    throw HttpError(404, "Not found");
  }
  res.json(contactById);
};

module.exports = getContactById;
