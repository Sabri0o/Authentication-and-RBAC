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

module.exports.signUp = signUp;
module.exports.signIn = signIn;
