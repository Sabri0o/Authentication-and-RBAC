const { UserModel } = require("../models/dbShema");
const bcrypt = require("bcryptjs");

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
    // res.json(saveUser);
    res.redirect('/api/signIn');
  } catch (err) {
    console.log("error");
    res.status(400).json({ error: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    console.log(req.body);
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      res
        .status(404)
        .json({ message: "no account that correspond to that email" });
    } else {
      let checkPassword = bcrypt.compareSync(req.body.password, user.password);
      if (!checkPassword) {
        res.json({
          message: "invalid password",
        });
      } else {
        res.json({
          message: "welcome",
        });
      }
    }
  } catch (err) {
    console.log("error");
    res.status(400).json({ error: err.message });
  }
};

module.exports.signUp = signUp;
module.exports.signIn = signIn;
