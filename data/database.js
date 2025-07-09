const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let databse;

const initDB = (callback) => {
    if (databse) {
        console.log('Database is already initialized!');
        return callback(null, databse);
    }
    MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
        database = client;
        callback(null, database);
    })
    .catch((err) => {
        callback(err);
    });  
};

module.exports = {
    initDB,
    getdatabase,
};
