const mongoose = require("mongoose");

let UserModel;

// validate email
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
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
  },
  roles: { type: Array, default: ["ROLE_USER"] },
});

// creating a User model
UserModel = mongoose.model("UserModel", userSchema);

module.exports.UserModel = UserModel;
