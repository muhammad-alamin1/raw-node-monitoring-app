/** Important utilities functionality */

// dependencies
const crypto = require('crypto');
const environment = require('./environments');

// object scaffolding
const utilities = {};

// parse json to object
utilities.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch (error) {
        output = {};
    }

    return output;
}

// hashing password
utilities.hashPassword = (str) => {
    if(typeof(str === 'string' && str.length > 0)) {
        let hash = crypto.createHmac('sha256', environment.secretKey)
                    .update(str)
                    .digest('hex');
        
        return hash;
    } 
    return false;
}

module.exports = utilities;