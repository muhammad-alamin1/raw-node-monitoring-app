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
};

// read data from file
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir+dir}/${file}.json`, 'utf-8', (err, data) => {
        callback(err, data);
    })
};

// update data
lib.update = (dir, file, data, callback) => {
    // open file 
    fs.open(`${lib.basedir+dir}/${file}.json`, 'r+', (error, fileDescriptor) =>{
        if(!error && fileDescriptor){
            // data to stringData
            const stringData = JSON.stringify(data);

            // truncate file
            fs.ftruncate(fileDescriptor, (err1) => {
                if(!err1) {
                    // write data 
                    fs.writeFile(fileDescriptor, stringData, 'utf-8', (err2) => {
                        if(!err2) {
                            fs.close(fileDescriptor, (err3) => {
                                if(!err3) {
                                    callback(false);
                                } else {
                                    callback(`Error: closing file.`);
                                }
                            });
                        } else {
                            callback(`Error: Writing to file.`)
                        }
                    })
                } else {
                    callback(`Error: truncating file.`);
                }
            })
        } else {
            callback(`Error updating: File not exist.`);
        }
    })
};

// delete file
lib.delete = (dir, file, callback) => {
    fs.unlink(`${lib.basedir+dir}/${file}.json`, (error) => {
        if(!error){
            callback(false);
        } else {
            callback(`Error: deleting file.`);
        }
    })
}

module.exports = lib;