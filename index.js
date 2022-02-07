/**
 *  Title: Uptime Monitoring Application
 *  Desc: A RESTful API to monitor up/down time of user define links.
 *  Auth: Muhammad
 * 
 */
// dependencies
const http = require('http');
const handler = require('./helpers/reqResHandler');


// App Object
const app = {};

// configuration
app.config = {
    PORT: 3000,
};

// create Server
app.createServer = () => {
    const server = http.createServer(app.handleRequestResponse);

    server.listen(app.config.PORT, () => {
        console.log(`server listening on http://localhost:${app.config.PORT}`);
    })
}

// request response controller
app.handleRequestResponse = handler.handleRequestResponse;

// start server
app.createServer();