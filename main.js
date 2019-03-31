// main.js
const express = require('express');
const bodyParser = require('body-parser');

// Khởi tạo App sử dụng Express
const app = express();
let port = 1337;

// Import Route and Expose API to the World:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const appRoutes = require('./routes'); // Imports all routes.
app.use('/', appRoutes); // Use routes.

// Set up mongoose connection
const mongoose = require('mongoose');
let uri = 'mongodb://localhost:27017,localhost:27018,' + 'localhost:27019/mongo_tx';
mongoose.connect(uri, {
  replicaSet: 'rs',
  useNewUrlParser: true,
  useFindAndModify: false
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error.'));

app.listen(port, () => {
  console.log('Server start @ ' + port);
});
