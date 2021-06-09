const { UserModel } = require("../models/dbShema");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");

// validate password middleware
const validatePassword = (req, res, next) => {
  let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  if (!re.test(req.body.password)) {
    res.json({
      message:
        "Password should contain at least 8 characters, 1 number, 1 lowercase character (a-z), 1 uppercase character (A-Z) and contains only 0-9a-zA-Z",
    });
    return;
  }
  next();
};

// check if the email is already taken
const checkIfEmailIsAlreadyUsed = async (req, res, next) => {
  let user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    res.json({ message: "email is already exist" });
    return;
  }
  next();
};


// verify client token 
const verifyJwtToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    res.status(400).json({
      message: "token is not provided",
    });
    return;
  }
  let verification = await jwt.verify(token, jwtConfig.secret);
  if (!verification) {
    res.status(400).json({
      message: "not authorized",
    });
    return;
  }
  req.userID = verification.id;
  next();
};

module.exports.validatePassword = validatePassword;
module.exports.checkIfEmailIsAlreadyUsed = checkIfEmailIsAlreadyUsed;
module.exports.verifyJwtToken = verifyJwtToken;
