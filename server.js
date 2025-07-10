const express = require('express');
const app = express();

const part = process.env.Post || 3000;

app.use('/', require('./routes'));

app.listen(part, () => {console.log(`Running on part ${part}`)});