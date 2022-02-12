/** Application routes  */

// dependencies
const { checkHandler } = require("./handlers/routeHandler/checkHandler");
const { sampleHandler } = require("./handlers/routeHandler/sampleHandler");
const { tokenHandler } = require("./handlers/routeHandler/tokenHandler");
const { userHandler } = require("./handlers/routeHandler/userHandler");

// route object
const routes = {
    sample : sampleHandler,
    user : userHandler,
    token: tokenHandler,
    check: checkHandler,
}


module.exports = routes;
