/** Application routes  */

// dependencies
const { sampleHandler } = require("./handlers/routeHandler/sampleHandler");
const { userHandler } = require("./handlers/routeHandler/userHandler");

// route object
const routes = {
    sample : sampleHandler,
    user : userHandler
}


module.exports = routes;