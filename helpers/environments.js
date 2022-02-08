/** Application all Environment variables */


// module object
const environments = {};

environments.staging = {
    PORT: 3000,
    envName: 'staging',
}

environments.production = {
    PORT: 5000,
    envName: 'production',
}

// which environment was passed
const currEnvironment = typeof(process.env.NODE_ENV === 'string') 
    ? process.env.NODE_ENV 
    : 'staging';

// export env object
const envToExport = typeof(environments[currEnvironment]) === 'object' 
    ? environments[currEnvironment] 
    : environments.staging;

module.exports = envToExport;