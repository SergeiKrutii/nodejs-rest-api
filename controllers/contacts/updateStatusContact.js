const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  if (!req.body) {
    throw HttpError(400, "missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = updateStatusContact;
