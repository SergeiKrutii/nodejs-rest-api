const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async ({ contactId }) => {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  return contactById || null;
};

const removeContact = async ({ contactId }) => {
  const contacts = await listContacts();
  const deleteIdxContact = contacts.findIndex((item) => item.id === contactId);

  if (deleteIdxContact === -1) return null;

  const [result] = contacts.splice(deleteIdxContact, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const updateContactIdx = contacts.findIndex((item) => item.id === id);
  if (updateContactIdx === -1) {
    return null;
  }
  contacts[updateContactIdx] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[updateContactIdx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
