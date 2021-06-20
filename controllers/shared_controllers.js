const { UserModel } = require("../models/dbShema");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");

// simulating home page
const homeBoard = (req, res) => {
  res.send("Welcome to the home page");
};

// update profile
const updateProfile = async (req, res) => {
  let userNewEmail = req.body.email;
  console.log("req.userId:", req.userID);
  try {
    if (userNewEmail) {
      let user = await UserModel.findById(req.userID);
      console.log(user);
      user.email = userNewEmail;
      let saveUser = await user.save();
      console.log(saveUser);
      let token = jwt.sign({ id: req.userID }, jwtConfig.secret, {
        expiresIn: 86400, // 24hours
      });
      res.json({
        status: true,
        message: {
          id: saveUser._id,
          email: saveUser.email,
          roles: saveUser.roles,
          accessToken: token,
        },
      });
    }
  } catch (err) {
    console.log(err.message);
    res.json({ message: err.message });
  }
};

module.exports.updateProfile = updateProfile;
module.exports.homeBoard = homeBoard;
