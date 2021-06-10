const controllers = require("../controllers/controllers");
const {
  validatePassword,
  checkIfEmailIsAlreadyUsed,
  verifyJwtToken,
  checkIfSupervisor,
  checkIfAdmin,
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

  app.get(
    "/api/supervisorBoard",
    [verifyJwtToken, checkIfSupervisor],
    controllers.supervisorBoard
  );

  app.get(
    "/api/adminBoard",
    [verifyJwtToken, checkIfAdmin],
    controllers.adminBoard
  );

  app.get(
    "/api/getAllUsers",
    [verifyJwtToken, checkIfSupervisor],
    controllers.getAllUsers
  );

  app.put(
    "/api/addSupervisor/:email",
    [verifyJwtToken, checkIfAdmin],
    controllers.addSupervisor
  );

  app.put(
    "/api/removeSupervisor/:email",
    [verifyJwtToken, checkIfAdmin],
    controllers.removeSupervisor
  );
};

module.exports.routes = routes;
