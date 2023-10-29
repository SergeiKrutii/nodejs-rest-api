const Joi = require("joi");
const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
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
  token: {
    type: String,
    default: null,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  avatarUrl: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
    default: "",
  },
});
userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const verifikation = Joi.object({
  email: Joi.string().required(),
});

const User = model("user", userSchema);

const schemas = {
  registerSchema,
  loginSchema,
  verifikation,
};

module.exports = {
  User,
  schemas,
};
