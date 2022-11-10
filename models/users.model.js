const { Schema, model, SchemaTypes } = require("mongoose");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

const User = model("users", userSchema);

module.exports = {
  User,
};
