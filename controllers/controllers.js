const { UserModel } = require("../models/dbShema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");

// signUp controller
const signUp = async (req, res) => {
  try {
    console.log(req.body);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    let user = new UserModel({
      email: req.body.email,
      password: hash,
    });
    let saveUser = await user.save();
    console.log(saveUser);
    res.json({
      status: true,
      message: "user is registered successfully",
    });
  } catch (err) {
    console.log("error:", err.message);
    res.json({
      status: false,
      message: err.message,
    });
  }
};

// signIn controller
const signIn = async (req, res) => {
  try {
    console.log(req.body);
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      res.json({
        status: false,
        message: "no account corresponds to that email",
      });
    } else {
      let checkPassword = bcrypt.compareSync(req.body.password, user.password);
      if (!checkPassword) {
        res.json({
          status: false,
          message: "invalid password",
        });
      } else {
        let token = jwt.sign({ id: user._id }, jwtConfig.secret, {
          expiresIn: 86400, // 24hours
        });
        res.json({
          status: true,
          message: {
            id: user._id,
            email: user.email,
            roles: user.roles,
            accessToken: token,
          },
        });
      }
    }
  } catch (err) {
    console.log("error");
    res.json({ status: false, message: err.message });
  }
};

// simulating home page
const homeBoard = (req, res) => {
  res.send("Welcome to the home page");
};

// simulating user board
const userBoard = (req, res) => {
  res.send("User Board");
};

// simulating supervisor board
const supervisorBoard = (req, res) => {
  res.send("supervisor Board");
};

// simulating admin board
const adminBoard = (req, res) => {
  res.send("admin Board");
};

// getAllUsers
const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find({ roles: { $nin: ["ROLE_ADMIN"] } });
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

// add new supervisor role
const addSupervisor = async (req, res) => {
  let userToSupervisor = req.params.email;
  try {
    let user = await UserModel.findOne({ email: userToSupervisor });
    console.log(user);
    if (user && !user.roles.includes("ROLE_SUPERVISOR")) {
      user.roles.push("ROLE_SUPERVISOR");
      let saveUser = await user.save();
      console.log(saveUser);
      res.json({ result: "Supervisor role is successfully Added" });
    }
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

// remove supervisor role
const removeSupervisor = async (req, res) => {
  let supervisorToUser = req.params.email;
  try {
    let user = await UserModel.findOne({ email: supervisorToUser });
    console.log(user);
    if (user && user.roles.includes("ROLE_SUPERVISOR")) {
      user.roles.splice(user.roles.indexOf("ROLE_SUPERVISOR"), 1);
      let saveUser = await user.save();
      console.log(saveUser);
      res.json({ result: "supervisor role is successfully removed" });
    }
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  }
};

module.exports.signUp = signUp;
module.exports.signIn = signIn;
module.exports.userBoard = userBoard;
module.exports.homeBoard = homeBoard;
module.exports.supervisorBoard = supervisorBoard;
module.exports.adminBoard = adminBoard;
module.exports.getAllUsers = getAllUsers;
module.exports.addSupervisor = addSupervisor;
module.exports.removeSupervisor = removeSupervisor;
