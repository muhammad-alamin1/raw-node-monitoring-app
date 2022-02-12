/** Handle user defined check */

const { parseJSON, createRandomString } = require('../../helpers/utilities');
const data = require('../../lib/data');
const tokenHandler = require('./tokenHandler');
const { maxChecks } = require('../../helpers/environments');

// scaffolding
const handler = {};

handler.checkHandler = (requestProperties, callback) => {
    const acceptedMethods = ['post', 'get', 'put', 'delete'];
    if(acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._check[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
}


handler._check = {};


handler._check.post = (requestProperties, callback) => {
    // valid input 
    let protocol = typeof(requestProperties.body.protocol) === 'string'
        && ['http', 'https'].indexOf(requestProperties.body.protocol) > -1
        ? requestProperties.body.protocol : false;
    
    let url = typeof(requestProperties.body.url) === 'string'
        && requestProperties.body.url.trim().length > 0
        ? requestProperties.body.url : false;
    
    let method = typeof(requestProperties.body.method) === 'string'
        && ['GET', 'POST', 'PUT', 'DELETE'].indexOf(requestProperties.body.method) > -1
        ? requestProperties.body.method : false;
    
    let successCode = typeof(requestProperties.body.successCode) === 'object'
        && requestProperties.body.successCode instanceof Array 
        ? requestProperties.body.successCode : false;
    
    let timeOutSeconds = typeof(requestProperties.body.timeOutSeconds) === 'number' 
        && requestProperties.body.timeOutSeconds % 1 === 0 
        && requestProperties.body.timeOutSeconds >= 1
        && requestProperties.body.timeOutSeconds <= 5
        ? requestProperties.body.timeOutSeconds : false;

    if(protocol && url && method && successCode && timeOutSeconds) {
        // check verify authentication token
        let token = typeof(requestProperties.headerObj.token) === 'string'
            ? requestProperties.headerObj.token : false;
        
        // user phone by reading the token 
        data.read('tokens', token, (err, tokenData) => {
            if(!err && tokenData) {
                let userPhone = parseJSON(tokenData).phone;
                
                // read user data
                data.read('users', userPhone, (err1, userData) => {
                    if(!err1 && userData) {
                        tokenHandler._token.verify(token, userPhone, (tokenIsValid) => {
                            if(tokenIsValid) {
                                let userObj = parseJSON(userData);
                                let userCheck = typeof(userObj.checks) === 'object' 
                                    && userObj.checks instanceof Array 
                                    ? userObj.checks : [];
                                
                                if(userCheck.length < maxChecks) {
                                    let checkId = createRandomString(25);
                                    let checkObj = {
                                        'id': checkId,
                                        userPhone,
                                        protocol,
                                        url,
                                        method,
                                        successCode,
                                        timeOutSeconds
                                    };

                                    // save obj data
                                    data.create('checks', checkId, checkObj, (err2) => {
                                        if(!err2) {
                                            // add checkId to the user object
                                            userObj.checks = userCheck;
                                            userObj.checks.push(checkId);

                                            // save new user 
                                            data.update('users', userPhone, userObj, (err3) => {
                                                if(!err3) {
                                                    // return the data 
                                                    callback(200, checkObj);
                                                } else {
                                                    callback(500, {
                                                        success: false,
                                                        error: `There was problem in server side.!`
                                                    })
                                                }
                                            })
                                        } else {
                                            callback(500, {
                                                success: false,
                                                error: `There was problem in server side.!`
                                            })
                                        }
                                    })
                                } else {
                                    callback(401, {
                                        error: `User has already max checks limit.!`
                                    })
                                }
                            } else {
                                callback(403, {
                                    success: false,
                                    error: `Authentication Failed.!`
                                })
                            }
                        })
                    } else {
                        callback(403, {
                            success: false,
                            error: `User not found.!`
                        })
                    }
                })
            } else {
                callback(403, {
                    success: false,
                    error: `Authentication Failed.!`
                })
            }
        })
    } else {
        callback(400, {
            error: `You have a problem in your input. Please try again!`
        })
    };
};

handler._check.get = (requestProperties, callback) => {
    // 
};

handler._check.put = (requestProperties, callback) => {

};

handler._check.delete = (requestProperties, callback) => {

};

module.exports = handler;