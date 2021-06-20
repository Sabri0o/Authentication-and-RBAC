const authentication_controllers = require("../controllers/authentication_controllers");
const admin_controllers = require("../controllers/admin_controllers");
const supervisor_controllers = require("../controllers/supervisor_controllers");
const user_controllers = require("../controllers/user_controllers");
const shared_controllers = require("../controllers/shared_controllers");

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
    authentication_controllers.signUp
  );

  app.post("/api/signIn", authentication_controllers.signIn);

  app.get("/api/homeBoard", shared_controllers.homeBoard);

  app.get("/api/userBoard", verifyJwtToken, user_controllers.userBoard);

  app.get(
    "/api/supervisorBoard",
    [verifyJwtToken, checkIfSupervisor],
    supervisor_controllers.supervisorBoard
  );

  app.get(
    "/api/adminBoard",
    [verifyJwtToken, checkIfAdmin],
    admin_controllers.adminBoard
  );

  app.put(
    "/api/updateProfile",
    [verifyJwtToken, checkIfEmailIsAlreadyUsed],
    shared_controllers.updateProfile
  );

  app.get(
    "/api/getAllUsers",
    [verifyJwtToken, checkIfSupervisor],
    supervisor_controllers.getAllUsers
  );

  app.get(
    "/api/getAllSupervisors",
    [verifyJwtToken, checkIfAdmin],
    admin_controllers.getAllSupervisors
  );

  app.put(
    "/api/addSupervisor",
    [verifyJwtToken, checkIfAdmin],
    admin_controllers.addSupervisor
  );

  app.put(
    "/api/removeSupervisor",
    [verifyJwtToken, checkIfAdmin],
    admin_controllers.removeSupervisor
  );
};

module.exports.routes = routes;
