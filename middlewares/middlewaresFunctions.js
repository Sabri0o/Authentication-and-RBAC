const { UserModel } = require("../models/dbShema");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");

// validate password middleware
const validatePassword = (req, res, next) => {
  let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  if (!re.test(req.body.password)) {
    res.json({
      status: false,
      message:
        "Password should contain at least 8 characters, 1 number, 1 lowercase character (a-z), 1 uppercase character (A-Z) and contains only 0-9a-zA-Z",
    });
    return;
  }
  next();
};

// check if the email is already taken
const checkIfEmailIsAlreadyUsed = async (req, res, next) => {
  if (!req.body.email) {
    res.json({ status: false, message: "email is not provided" });
  }
  let user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    res.json({ status: false, message: "email already exists" });
    return;
  }
  next();
};

// verify client token
const verifyJwtToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    res.json({
      status: false,
      message: "token is not provided",
    });
    return;
  }
  let verification = await jwt.verify(token, jwtConfig.secret);
  if (!verification) {
    res.json({
      status: false,
      message: "not authorized",
    });
    return;
  }
  req.userID = verification.id;
  next();
};

// verify if the user has the role supervisor
const checkIfSupervisor = async (req, res, next) => {
  // console.log(req.userID);
  let user = await UserModel.findOne({ _id: req.userID });
  if (!user.roles.includes("ROLE_SUPERVISOR")) {
    res.json({ status: false, message: "You are not supervisor" });
    return;
  }
  next();
};

// verify if the user has the role admin
const checkIfAdmin = async (req, res, next) => {
  let user = await UserModel.findOne({ _id: req.userID });
  if (!user.roles.includes("ROLE_ADMIN")) {
    res.json({ status: false, message: "You are not admin" });
    return;
  }
  next();
};

module.exports.validatePassword = validatePassword;
module.exports.checkIfEmailIsAlreadyUsed = checkIfEmailIsAlreadyUsed;
module.exports.verifyJwtToken = verifyJwtToken;
module.exports.checkIfSupervisor = checkIfSupervisor;
module.exports.checkIfAdmin = checkIfAdmin;
