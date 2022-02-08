/** CRUD functionality */

const fs = require('fs');
const path = require('path');

// module object
const lib = {};

// base directory of the data folder
lib.basedir = path.join(`${__dirname}/../.data/`);

// write data to file
lib.create = (dir, file, data, callback) => {
    // open file
    fs.open(`${lib.basedir+dir}/${file}.json`, 'wx', (error, fileDescriptor) => {
        if(!error && fileDescriptor) {
            // convert data to json
            const stringData = JSON.stringify(data);

            // write data to file then close it
            fs.writeFile(fileDescriptor, stringData, 'utf-8', (err1) => {
                if(!err1) {
                    fs.close(fileDescriptor, (err2) => {
                        if(!err2) {
                            callback(false);
                        } else {
                            callback(`Error: closing the new file!`)
                        }
                    });
                } else {
                    callback(`Error: writing to new file!`);
                }
            });
        } else {
            callback(`Could not create new file, it may already exist.`);
        }
    });
}



module.exports = lib;