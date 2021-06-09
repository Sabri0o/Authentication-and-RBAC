const controllers = require("../controllers/controllers")
const {validatePassword} = require("../middlewares/middlewaresFunctions")

const routes = (app)=>{
    app.post('/api/signUp',validatePassword,controllers.signUp)
}

module.exports.routes = routes