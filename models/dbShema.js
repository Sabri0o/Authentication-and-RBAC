const mongoose = require("mongoose");

let UserModel;

//creating user schema

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles: {type: Array, default: ['ROLE_USER']},
});

// creating a User model
UserModel = mongoose.model("UserModel", userSchema);

module.exports.UserModel = UserModel;
