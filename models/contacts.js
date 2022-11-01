const fs = require("fs/promises");
const path = require("path");
const { v4: IdGenerator } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateData = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
};

//
const listContacts = async () => {
  const res = await fs.readFile(contactsPath);
  return JSON.parse(res);
};

//
const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const getСontactId = contacts.find((item) => item.id === contactId);
  if (!getСontactId) return null;
  const [contact] = contacts.filter((item) => item.id === contactId);

  return contact;
};

//
const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const foundСontactId = contacts.find((item) => item.id === contactId);
  if (!foundСontactId) return null;

  const nevContacts = contacts.filter((item) => item.id !== contactId);

  await updateData(nevContacts);
  return foundСontactId;
};

//
const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = {
    id: IdGenerator(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateData(contacts);
  return newContact;
};

//
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const foundСontactId = contacts.find((item) => item.id === contactId);
  if (!foundСontactId) return null;

  const nevContacts = contacts.filter((item) => item.id !== contactId);
  nevContacts.push({ id: contactId, ...body });

  await updateData(nevContacts);
  return { id: contactId, ...body };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
