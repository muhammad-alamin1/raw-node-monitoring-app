/** Application all Environment variables */


// module object
const environments = {};

environments.staging = {
    PORT: 8000,
    envName: 'staging',
    secretKey: 'lasl928lkjfd@lks$lkaskdj983lkdj4klac@!lksd!lkds',
    maxChecks: 5,
    twilio: {
        fromPhone: '+8801315792303',
        accountSid: 'AC8ad70e241a77b90e86fcd7e3297735d4',
        authToken: '160a04fb5bf7237f0aab4d72ef80bb7d'
    }
}

environments.production = {
    PORT: 5000,
    envName: 'production',
    secretKey: 'aslksl928lkfd@lks$dlkaskdj983lkdj4kac@!lksd!lkds',
    maxChecks: 5,
    twilio: {
        fromPhone: '+8801315792303',
        accountSid: 'AC8ad70e241a77b90e86fcd7e3297735d4',
        authToken: '160a04fb5bf7237f0aab4d72ef80bb7d'
    }
}

// which environment was passed
const currEnvironment = typeof(process.env.NODE_ENV === 'string') ?
    process.env.NODE_ENV :
    'staging';

// export env object
const envToExport = typeof(environments[currEnvironment]) === 'object' ?
    environments[currEnvironment] :
    environments.staging;

module.exports = envToExport;