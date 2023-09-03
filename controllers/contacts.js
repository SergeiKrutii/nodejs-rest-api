const Joi = require("joi");
const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getAllContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const contactById = await contacts.getContactById(req.params);
  if (!contactById) {
    throw HttpError(404, "Not found");
  }
  res.json(contactById);
};

const addContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const newContact = await contacts.addContact(req.body);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const result = await contacts.removeContact(req.params);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "Contact deleted",
  });
};

const updateContact = async (req, res) => {
  const { contactId: id } = req.params;
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const updatedContact = await contacts.updateContact(id, req.body);
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updatedContact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
