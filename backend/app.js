const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config.js');

// set up app

const app = express();

// connect to db

mongoose.connect(
  // create your own config based on config-example.js file
  config.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .catch(error => console.log(error));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(__dirname + '/build/static'));
app.use('/static/css', express.static(__dirname + '/build/static/css'));
app.use('/static/js', express.static(__dirname + '/build/static/js'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

// init routes
app.use('/players', require('./routes/players'));
app.use('/games', require('./routes/games'));
app.use('/statistics', require('./routes/statistics'));

app.listen('8080', () => {
  console.log('Listening to port 8080');
});
