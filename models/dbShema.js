const mongoose = require("mongoose");

let User;

//creating user schema

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  accessToken: { type: String, default: "" },
});

// creating a User model
UserModel = mongoose.model("UserModel", userSchema);

exports.UserModel = UserModel;
