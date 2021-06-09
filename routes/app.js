const controllers = require("../controllers/controllers")

const routes = (app)=>{
    app.post('/api/signUp',controllers.signUp)
}

module.exports.routes = routes