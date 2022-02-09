/** User handler -> Route handler to handle user related routes */

// dependencies
const { hashPassword } = require('../../helpers/utilities');
const data = require('../../lib/data');

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
    const firstName = typeof(requestProperties.body.firstName) === 'string' 
        && requestProperties.body.firstName.trim().length > 0 
        ? requestProperties.body.firstName
        : false;

    const lastName = typeof(requestProperties.body.lastName) === 'string' 
        && requestProperties.body.lastName.trim().length > 0 
        ? requestProperties.body.lastName
        : false;
    
    const phone = typeof(requestProperties.body.phone) === 'string'
        && requestProperties.body.phone.trim().length === 11
        ? requestProperties.body.phone
        : false;
    
    const password = typeof(requestProperties.body.password) === 'string'
        && requestProperties.body.password.trim().length > 0
        ? requestProperties.body.password
        : false;
    
    const toAgreement = typeof(requestProperties.body.toAgreement) === 'boolean'
        ? requestProperties.body.toAgreement
        : false;
    

    if(firstName && lastName && phone && password && toAgreement) {
        // check user doesn't already exist
        data.read('users', phone, (err, user) => {
            if(err) {
                let userObj = {
                    firstName,
                    lastName,
                    phone,
                    password: hashPassword(password),
                    toAgreement
                };

                // store user to database
                data.create('users', phone, userObj, (error) => {
                    if(!error) {
                        callback(200, {
                            success: true,
                            message: `User was create successfully.!`
                        })
                    } else {
                        callback(500, {
                            error: `Could not create user.!`
                        })
                    }
                })
                
            } else {
                callback(500, {
                    success: false,
                    error: `There was a problem in server side.!`
                })
            }
        })

    } else {
        callback(400, {         // 400 statusCode -> user send wrong request
            success: false,
            error: `You have a problem in your request.!`
        })
    }
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