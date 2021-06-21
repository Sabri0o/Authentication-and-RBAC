const { UserModel } = require("../models/dbShema");

// simulating admin board
const adminBoard = (req, res) => {
  res.send("Any content sent from server");
};

// getAllRoles
const getAllRoles = async (req, res) => {
  try {
    let allRoles = await UserModel.find({ roles: { $nin: ["ROLE_ADMIN"] } });
    res.json(allRoles);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

// getAllSupervisors
const getAllSupervisors = async (req, res) => {
  try {
    let users = await UserModel.find({
      roles: { $nin: ["ROLE_ADMIN"], $in: ["ROLE_SUPERVISOR"] },
    });
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

// add new supervisor role
const addSupervisor = async (req, res) => {
  let userToSupervisor = req.body.email;
  console.log("req.body:", req.body);
  try {
    let user = await UserModel.findOne({ email: userToSupervisor });
    console.log(user);
    if (user && !user.roles.includes("ROLE_SUPERVISOR")) {
      user.roles.push("ROLE_SUPERVISOR");
      let saveUser = await user.save();
      console.log(saveUser);
      let allUsers = await UserModel.find();

      res.json(allUsers);
    }
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

// remove supervisor role
const removeSupervisor = async (req, res) => {
  let supervisorToUser = req.body.email;
  try {
    let user = await UserModel.findOne({ email: supervisorToUser });
    console.log(user);
    if (user && user.roles.includes("ROLE_SUPERVISOR")) {
      user.roles.splice(user.roles.indexOf("ROLE_SUPERVISOR"), 1);
      let saveUser = await user.save();
      console.log(saveUser);
      let users = await UserModel.find();

      res.json(users);
    }
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

module.exports.adminBoard = adminBoard;
module.exports.removeSupervisor = removeSupervisor;
module.exports.addSupervisor = addSupervisor;
module.exports.getAllSupervisors = getAllSupervisors;
module.exports.getAllRoles = getAllRoles;
