const { Contact, addSchema } = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updatedContact);
};

module.exports = updateContact;
