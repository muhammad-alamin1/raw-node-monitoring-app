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

// testing file system
// data.create('test', 'newFile1', {"name": "Muhammad", "country": "Bangladesh"}, (err) => {
//     console.log(`Error was ${err}`);
// })

// read
data.read('test', 'newFile1', (err, data) => {
    if(!err){
        const stringData = JSON.parse(data);
        console.log(stringData);
    }else{
        console.log(err);
    }
})

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