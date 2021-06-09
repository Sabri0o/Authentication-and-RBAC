const controllers = require("../controllers/controllers");
const {
  validatePassword,
  checkIfEmailIsAlreadyUsed,
  verifyJwtToken,
  checkIfSupervisor,
  checkIfAdmin
} = require("../middlewares/middlewaresFunctions");

const routes = (app) => {
  app.post(
    "/api/signUp",
    [validatePassword, checkIfEmailIsAlreadyUsed],
    controllers.signUp
  );

  app.post("/api/signIn", controllers.signIn);

  app.get("/api/homeBoard", controllers.homeBoard);

  app.get("/api/userBoard", verifyJwtToken, controllers.userBoard);

  app.get("/api/supervisorBoard", [verifyJwtToken,checkIfSupervisor], controllers.userBoard);

  app.get("/api/adminBoard", [verifyJwtToken,checkIfAdmin], controllers.userBoard);

};

module.exports.routes = routes;
