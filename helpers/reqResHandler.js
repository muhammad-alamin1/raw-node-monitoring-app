// dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { pageNotFoundHandler } = require('../handlers/routeHandler/notFoundHandler');


// module object
const handler = {};

// handling request response object
handler.handleRequestResponse = (req, res) => {
    // req handling
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObj = parsedUrl.query;
    const headerObj = req.headers;

    // req properties
    const reqProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObj,
        headerObj
    }

    const decoder = new StringDecoder('utf-8');
    let data = '';

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : pageNotFoundHandler;


    req.on('data', (buffer) => {
        data += decoder.write(buffer);
    })

    req.on('end', () => {
        data += decoder.end();

        chosenHandler(reqProperties, (statusCode, payload) => {
            statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
            payload = typeof(payload) === 'object' ? payload : {};
    
            const payloadString = JSON.stringify(payload);
            
            // final response
            res.writeHead(statusCode);
            res.end(payloadString);
        });

    })

}

module.exports = handler;