/** Token related routes */

const { hashPassword, createRandomString, parseJSON } = require("../../helpers/utilities");
const data = require("../../lib/data");

// token object
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if(acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._token[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
}

handler._token = {};


// creat token handler post method 
handler._token.post = (requestProperties, callback) => {
    const phone = typeof(requestProperties.body.phone) === 'string'
        && requestProperties.body.phone.trim().length === 11
        ? requestProperties.body.phone
        : false;

    const password = typeof(requestProperties.body.password) === 'string'
        && requestProperties.body.password.trim().length > 0
        ? requestProperties.body.password
        : false;

    if(phone && password) {
        data.read('users', phone, (err, userData) => {
            let hashedPassword = hashPassword(password);

            if(hashedPassword === parseJSON(userData).password) {
                let tokenId = createRandomString(25);
                let expires = Date.now() + 60 * 60 * 1000; // 1h

                let tokenObj = {
                    phone,
                    'id': tokenId,
                    expires,
                }

                // store the token
                data.create('tokens', tokenId, tokenObj, (err1) => {
                    if(!err1) {
                        callback(200, tokenObj);
                    } else {
                        callback(500, {
                            error: `There was a problem in the server side!`
                        })
                    }
                })
            } else {
                callback(400, {
                    error: `Password is not valid!`
                })
            }
        })
    } else {
        callback(400, {
            error: `You have a problem in your request. Please try again!`
        })
    }
}

// get token by id query 
handler._token.get = (requestProperties, callback) => {
    // check id is valid
    const id = typeof(requestProperties.queryStringObj.id) === 'string'
        && requestProperties.queryStringObj.id.trim().length === 25
        ? requestProperties.queryStringObj.id
        : false;
    
    if(id) {
        // lookup the token
        data.read('tokens', id, (err, tokenData) => {
            const token = { ...parseJSON(tokenData) };
            if(!err && token) {
                callback(200, token);
            } else {
                callback(404, {
                    success: false,
                    error: `your requested token could not be found.!`
                })
            }
        })
    } else {
        callback(404, {
            success: false,
            error: `your requested token could not be found.!`
        })
    }
}

// update token
handler._token.put = (requestProperties, callback) => { 
    // check id is valid
    const id = typeof(requestProperties.body.id) === 'string'
        && requestProperties.body.id.trim().length === 25
        ? requestProperties.body.id
        : false;

    // extend time
    const extend = typeof(requestProperties.body.extend) === 'boolean'
        && requestProperties.body.extend === true
        ? true : false;

    if(id && extend) {
        data.read('tokens', id, (err, tokenData) => {
            const tokenObj = parseJSON(tokenData);
            if(tokenObj.expires > Date.now()) {
                tokenObj.expires = Date.now() + 60 * 60 * 1000;

                // store the updated token
                data.update('tokens', id, tokenObj , (err1) => {
                    if(!err1) {
                        callback(200, {
                            success: true,
                            message: 'Token updated successfully.!'
                        })
                    } else {
                        callback(500, {
                            error: `There was a server side error!`
                        })
                    }
                })
            } else {
                callback(400, {
                    error: `Token already expired!`
                })
            }
        })
    } else {
        callback(400, {
            error: `There was a problem in your request. Please try again!`
        })
    }
}

// delete token
handler._token.delete = (requestProperties, callback) => {
        // check id is valid
    const id = typeof(requestProperties.queryStringObj.id) === 'string'
        && requestProperties.queryStringObj.id.trim().length === 25
        ? requestProperties.queryStringObj.id
        : false;

    if (id) {
        // search user by phone number
        data.read('tokens', id, (err, token) => {
            if (!err && token) {
                data.delete('tokens', id, (error) => {
                    if (!error) {
                        callback(200, {
                            success: true,
                            message: 'token deleted successfully.!`'
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