import {IConfig} from "./IConfig";

let config: IConfig = {
    mongodb: {
        username: process.env.MONGODB_USERNAME || 'wazaa',
        password: process.env.MONGODB_PASSWORD || 'wazaa',
        host: process.env.MONGODB_HOST || 'localhost',
        port: process.env.MONGODB_PORT || 47752,
        databaseName: process.env.MONGODB_NAME || 'ng2-quiz'
    },
    server: {}
};

module.exports = config;
