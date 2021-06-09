// validate password
const validatePassword = function (req, res, next) {
  var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  if (!re.test(req.body.password)) {
    res.json({
      message:
        "Password should contain at least 8 characters, 1 number, 1 lowercase character (a-z), 1 uppercase character (A-Z) and contains only 0-9a-zA-Z",
    });
    return
  }
  next();
};

module.exports.validatePassword = validatePassword;
