/** Page Not Found */

// not found object
const handler = {};

handler.pageNotFoundHandler = (requestProperties, callback) => {
    callback(404, { 
        success: false,
        message: 'Your request URL was not found!',
    })
}


module.exports = handler;