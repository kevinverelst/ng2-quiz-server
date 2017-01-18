let MongoClient = require('mongodb').MongoClient;
let util = require('util');
let config = require('./config');
let _db;

let uri = util.format('mongodb://%s:%s@%s:%d/%s',
    config.mongodb.username, config.mongodb.password, config.mongodb.host, config.mongodb.port, config.mongodb.databaseName);

module.exports = {
    connectToServer: function (callback) {
        MongoClient.connect(uri, {auto_reconnect: true}, function (err, db) {
            if (err) {
                throw err;
            } else if (!db) {
                console.log('Unkown error connection to database');
            } else {
                console.log('Connected to MongoDB database server at:');
                console.log('\n\t%s\n', uri);
                _db = db;
            }
            return callback(err);
        });
    },
    getDb: function () {
        return _db;
    }
};
