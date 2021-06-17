const { UserModel } = require("../models/dbShema");

// simulating home page
const homeBoard = (req, res) => {
  res.send("Welcome to the home page");
};

// update profile
const updateProfile = async (req, res) => {
  let userNewEmail = req.body.newEmail;
  console.log("req.userId:", req.userID);
  try {
    if (userNewEmail) {
      let user = await UserModel.findById(req.userID);
      console.log(user);
      user.email = userNewEmail;
      let saveUser = await user.save();
      console.log(saveUser);
      res.json({
        status: true,
        message: "email is updated successfully",
      });
    } else {
      res.json({
        status: false,
        message: "no email provided",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

module.exports.updateProfile = updateProfile;
module.exports.homeBoard = homeBoard;
