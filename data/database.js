const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

let database;

const initDB = async (callback) => {
  if (database) {
    console.log('Database is already initialized!');
    return callback(null, database);
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    database = client.db('project1'); // store DB directly
    console.log('Database connection established.');
    callback(null, database);
  } catch (err) {
    callback(err);
  }
};

const getDatabase = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

module.exports = {
  initDB,
  getDatabase
};
