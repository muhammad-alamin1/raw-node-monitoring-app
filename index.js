/**
 *  Title: Uptime Monitoring Application
 *  Desc: A RESTful API to monitor up/down time of user define links.
 *  Auth: Muhammad
 * 
 */
// dependencies
const http = require('http');
const envToExport = require('./helpers/environments');
const handler = require('./helpers/reqResHandler');
const data = require('./lib/data');


// App Object
const app = {};

// testing methods
// data.delete('test', 'newFile', (err) => {
//     console.log(false);
// })

// create Server
app.createServer = () => {
    const server = http.createServer(app.handleRequestResponse);

    server.listen(envToExport.PORT, () => {
        console.log(`server listening on http://localhost:${envToExport.PORT}`);
    })
}

// request response controller
app.handleRequestResponse = handler.handleRequestResponse;

// start server
app.createServer();