const mongoose = require("mongoose");

let UserModel;

// validate email
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

// validate password
var validatePassword = function (password) {
  var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  return re.test(password);
};

//creating user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [validateEmail, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: true,
    validate: [
      validatePassword,
      `Password should contain at least 8 characters, 1 number, 1 lowercase character (a-z), 1 uppercase character (A-Z) and contains only 0-9a-zA-Z`,
    ],
  },
  roles: { type: Array, default: ["ROLE_USER"] },
});

// creating a User model
UserModel = mongoose.model("UserModel", userSchema);

module.exports.UserModel = UserModel;
