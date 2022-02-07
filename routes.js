/** Application routes  */

// dependencies
const { sampleHandler } = require("./handlers/routeHandler/sampleHandler");

// route object
const routes = {
    sample : sampleHandler
}


module.exports = routes;