const PORT = 9000;

const express = require('express');
const app = express(),
      server = require('http').createServer(app),
      bodyParser = require('body-parser'),
      db = require('./db'),
      config = require('config');

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control');
    next();
});
app.use('/api', require('./routes'));


server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});
