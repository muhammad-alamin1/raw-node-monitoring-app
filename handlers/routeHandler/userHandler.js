/** User handler -> Route handler to handle user related routes */

// dependencies
const { hashPassword, parseJSON } = require('../../helpers/utilities');
const data = require('../../lib/data');

// user object
const handler = {};


handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ['post', 'get', 'put', 'delete'];
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

// TODO -> check authentication
// get request
handler._user.get = (requestProperties, callback) => {
    // check phone number is valid
    const phone = typeof(requestProperties.queryStringObj.phone) === 'string'
        && requestProperties.queryStringObj.phone.trim().length === 11
        ? requestProperties.queryStringObj.phone
        : false;
    
    if(phone) {
        // search user by phone number
        data.read('users', phone, (err, usr) => {
            const user = { ...parseJSON(usr) };
            if(!err && user) {
                delete  user.password;
                callback(200, user);
            } else {
                callback(404, {
                    success: false,
                    error: `Requested user was not found.!`
                })
            }
        })
    } else {
        callback(404, {
            success: false,
            error: `Requested user was not found.!`
        })
    }

}

// TODO -> check authentication
// put request
handler._user.put = (requestProperties, callback) => {
    // check phone number is valid
    const phone = typeof(requestProperties.body.phone) === 'string'
        && requestProperties.body.phone.trim().length === 11
        ? requestProperties.body.phone
        : false;
    
    const firstName = typeof(requestProperties.body.firstName) === 'string' 
        && requestProperties.body.firstName.trim().length > 0 
        ? requestProperties.body.firstName
        : false;

    const lastName = typeof(requestProperties.body.lastName) === 'string' 
        && requestProperties.body.lastName.trim().length > 0 
        ? requestProperties.body.lastName
        : false;
    
    const password = typeof(requestProperties.body.password) === 'string'
        && requestProperties.body.password.trim().length > 0
        ? requestProperties.body.password
        : false;
    
    if (phone) {
        if (firstName || lastName || password) {
            // lookup the user
            data.read('users', phone, (err, userData) => {
                const usrData = { ... parseJSON(userData) };
                
                if (!err && usrData) {
                    if (firstName) {
                        usrData.firstName = firstName;
                    }
                    if (lastName) {
                        usrData.lastName = lastName;
                    }
                    if (password) {
                        usrData.password = hashPassword(password);
                    }

                    // store updated data to database
                    data.update('users', phone, usrData, (error) => {
                        if (!error) {
                            callback(200, {
                                success: true,
                                message: `User was updated successfully.!`
                            })
                        } else {
                            callback(500, {
                                error: `Problem in the server side!`
                            })
                        }
                    })
                } else {
                    callback(400, {
                        error: `You have a problem in your request. Please try again!`
                    })
                }
            })
        } else {
            callback(400, {
                error: `You have a problem in your request. Please try again!`
            })
        }
    } else {
        callback(400, {
            error: 'Invalid phone number. Please try again!'
        })
    }
}

// TODO -> check authentication
// delete request
handler._user.delete = (requestProperties, callback) => {
    // check phone number is valid
    const phone = typeof(requestProperties.queryStringObj.phone) === 'string'
        && requestProperties.queryStringObj.phone.trim().length === 11
        ? requestProperties.queryStringObj.phone
        : false;
    
    if (phone) {
        // search user by phone number
        data.read('users', phone, (err, user) => {
            if (!err && user) {
                data.delete('users', phone, (error) => {
                    if (!error) {
                        callback(200, {
                            success: true,
                            message: 'User deleted successfully.!`'
                        })
                    } else {
                        callback(500, {
                            success: false,
                            error: `There was a server side error.!`
                        })
                    }
                })
            } else {
                callback(500, {
                    success: false,
                    error: `There was a server side error.!`
                })
            }
        })
    } else {
        callback(400, {
            error: `A problem in your request.!`
        })
    }
}


module.exports = handler;