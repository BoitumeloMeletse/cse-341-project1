const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDB = (callback) => {
    if (database) {
        console.log('Database is already initialized!');
        return callback(null, database);  // Fixed typo here (changed 'databse' to 'database')
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

const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized');
    }
    return database;
};

module.exports = {
    initDB,
    getDatabase,  // Make sure the case matches when you import/use it
};