const PORT = 9000;

const express = require('express');
const app = express(),
      server = require('http').createServer(app),
      bodyParser = require('body-parser'),
      db = require('./db'),
      config = require('config');

app.use(bodyParser.json());
app.use('/api', require('./routes'));


server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});
