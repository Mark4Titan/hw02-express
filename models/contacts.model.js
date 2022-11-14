const { Schema, model, SchemaTypes } = require("mongoose");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minLength: 2,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      minLength: 3,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
};
