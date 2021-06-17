// simulating supervisor board
const supervisorBoard = (req, res) => {
  res.send("Any content sent from server");
};
const { UserModel } = require("../models/dbShema");

// getAllUsers
const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find({
      roles: { $nin: ["ROLE_ADMIN", "ROLE_SUPERVISOR"] },
    });
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

module.exports.supervisorBoard = supervisorBoard;
module.exports.getAllUsers = getAllUsers;
