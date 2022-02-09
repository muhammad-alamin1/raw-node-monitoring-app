/** Application all Environment variables */


// module object
const environments = {};

environments.staging = {
    PORT: 3000,
    envName: 'staging',
    secretKey: 'lasl928lkjfd@lks$lkaskdj983lkdj4klac@!lksd!lkds'
}

environments.production = {
    PORT: 5000,
    envName: 'production',
    secretKey: 'aslksl928lkfd@lks$dlkaskdj983lkdj4kac@!lksd!lkds'
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