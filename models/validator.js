const Joi = require("joi");

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

const authSchema = Joi.object({
  email: Joi.string().min(6).required(),
  password: Joi.string().min(6).required(),
});



module.exports = {
  contactsSchema,
  contactsChangeSchema,
  favoriteSchema,
  authSchema,
};