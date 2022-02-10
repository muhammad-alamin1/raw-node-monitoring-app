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


// create a new token 
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

handler._token.get = (requestProperties, callback) => {
    
}

handler._token.put = (requestProperties, callback) => {
    
}

handler._token.delete = (requestProperties, callback) => {
    
}


module.exports = handler;