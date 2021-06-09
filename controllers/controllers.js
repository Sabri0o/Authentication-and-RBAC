const { UserModel } = require("../models/dbShema");
const bcrypt = require("bcryptjs");



const signUp = (req, res) => {
  console.log(req.body);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  let user = new UserModel({
    email: req.body.email,
    password: hash,
  });

  user.save((err) => {
    if (err) {
      console.log("error");
      res.status(400).json({ error: err.message });
    } else {
      res.json(user);
    }
  });
};

module.exports.signUp = signUp;
