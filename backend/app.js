const express = require('express');
const mongoose = require('mongoose');

// set up app

const app = express();

// connect to db

mongoose.connect('mongodb://localhost/teamstat', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/frontend', express.static('frontend'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// production frontend
app.get('/', (req, res) => {
  res.sendFile('/frontend/index.html');
});

// init routes
app.use('/players', require('./routes/players'));
app.use('/games', require('./routes/games'));

app.listen('8080', () => {
  console.log('Listening to port 8080');
});
