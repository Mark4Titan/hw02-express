const express = require("express");
const Joi = require("joi");

const { Contact } = require("../../models/contacts.model");

const router = express.Router();

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});
const contactsChangeSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});
const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const result = await Contact.findById(req.params.contactId);
    if (!result) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: "missing required name field" });

    const result = await Contact.create(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await Contact.findByIdAndDelete(req.params.contactId);
    if (!result) return res.status(404).json({ message: "not found" });

    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsChangeSchema.validate(req.body);
    if (error) return res.status(404).json({ message: "missing fields" });
    const result = await updateStatusContact(req.params.contactId, req.body);
    
    if (!result) return res.status(404).json({ message: "not found" });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const favorite =
      typeof req.body.favorite === "boolean" ? req.body.favorite : null;

    req.body = { favorite };
    const { error } = favoriteSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: "missing field favorite" });
    
    const result = await updateStatusContact(req.params.contactId, req.body);

    if (!result) return res.status(404).json({ message: "not found" });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

const updateStatusContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, body, { new: true });
};

module.exports = router;
