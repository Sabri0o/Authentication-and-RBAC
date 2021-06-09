const controllers = require("../controllers/controllers");
const {
  validatePassword,
  checkIfEmailIsAlreadyUsed,
} = require("../middlewares/middlewaresFunctions");

const routes = (app) => {
  app.post(
    "/api/signUp",
    [validatePassword, checkIfEmailIsAlreadyUsed],
    controllers.signUp
  );
};

module.exports.routes = routes;
