
const {
  contactsSchema,
  contactsChangeSchema,
  favoriteSchema,
} = require("../../models/validator");

const { Contact } = require("../../models/contacts.model");

async function getAll(req, res) {
  const result = await Contact.find();

  return res.status(200).json(result);
}

async function findOneById(req, res) {
  const { id } = await paramsContact(req);

  const result = await Contact.findById(id);
  if (!result) throw new Error("!found");

  return res.status(200).json(result);
}

async function create(req, res) {
  const { body } = await paramsContact(req);

  const { error } = contactsSchema.validate(body);
  if (error) throw new Error("!validation");  
  const result = await Contact.create(body);

  return res.status(201).json(result);
}

async function deleteById(req, res) {
  const { id } = await paramsContact(req);

  const result = await Contact.findByIdAndDelete(id);
  if (!result) throw new Error("!found");

  return res.status(200).json({ message: "contact deleted" });
}

async function updateById(req, res) {
  const { id, body } = await paramsContact(req);

  const { error } = contactsChangeSchema.validate(body);
  if (error) throw new Error("!missing");
  const result = await updateStatusContact(id, body);
  if (!result) throw new Error("!found");

  return res.status(200).json(result);
}

async function favoriteUpdate(req, res) {
  const { id, body } = await paramsContact(req);

  const { error } = favoriteSchema.validate(body);
  if (error) throw new Error("!favorite");
  const result = await updateStatusContact(id, body);
  if (!result) throw new Error("!found");

  return res.status(200).json(result);
}


const updateStatusContact = async (id, body) => {
  return await Contact.findByIdAndUpdate(id, body, { new: true });
};
const paramsContact = async (req) => {
  return await { id: req.params.id, body: req.body };
};

module.exports = {
  getAll,
  findOneById,
  create,
  deleteById,
  updateById,
  favoriteUpdate,
};
