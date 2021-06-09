const { UserModel } = require("../models/dbShema");

const signUp = (req, res) => {
  console.log(req.body);
  let user = new UserModel({
    email: req.body.email,
    password: req.body.password,
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
