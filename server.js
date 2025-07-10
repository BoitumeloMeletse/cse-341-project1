const express = require('express');

const mongodb = require('./data/database');
const app = express();

const part = process.env.Post || 3000;

app.use('/', require('./routes'));



mongodb.initDB((err) => {
    if (err) {
        console.error(err);
    } 
    else {
        app.listen(part, () => {console.log(`Database is listening and node Running on part ${part}`)});
    }
});