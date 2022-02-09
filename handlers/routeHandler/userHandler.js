/** User handler -> Route handler to handle user related routes */

// user object
const handler = {};


handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if(acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._user[requestProperties.method](requestProperties, callback);
    } else {
        callback(405, {    // 405 statusCode -> request not allowed
            success: false,
            message: 'Request not allowed.!'
        })
    }

}


// private user scaffolding
handler._user = {};


// post request
handler._user.post = (requestProperties, callback) => {

}

// get request
handler._user.get = (requestProperties, callback) => {
    callback(200)
}

// put request
handler._user.put = (requestProperties, callback) => {

}

// delete request
handler._user.delete = (requestProperties, callback) => {

}


module.exports = handler;