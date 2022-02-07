/** Sample Handler */

// sample object
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    // console.log(requestProperties);
    callback(200, {
        success: true,
        message: 'This is a sample url'
    })
}


module.exports = handler;