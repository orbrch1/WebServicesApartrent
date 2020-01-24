/* Mongoose connection using events */
const mongoose = require('mongoose');
const {DB_USER, DB_PASS, DB_HOST } = require('./constants');

const connectionString = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`;
 // mongodb+srv://orbrch1:<password>@cluster0-bkahm.mongodb.net/test?retryWrites=true&w=majority

//  const connectionString = `mongodb+srv://orbrch1:ormongodb3!@cluster0-bkahm.mongodb.net/test?retryWrites=true&w=majority`;
 
// console.log(DB_USER);
// console.log(DB_PASS);
// console.log(DB_HOST);
console.log(connectionString);

// console.log(connectionString);

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true // To remove annoying warning,
// autoReconnect: true,
};

mongoose.connect(connectionString, options)
    .then(db => console.log(`MongoDB is initialized & connected to ${db.connection.name}`))
    .catch(err => console.log('Connection Error', err));

module.exports = {
    mongoDbOptions: options,
    mongoDbUrl: connectionString
};

// const mongoose = require('mongoose');
// const consts = require('./consts');

// const { MLAB_URL, DB_USER, DB_PASS } = consts;
// const url = MLAB_URL;
// const options = {
//  useNewUrlParser: true, // For deprecation warnings
//  useCreateIndex: true, // For deprecation warnings
//  user: DB_USER,
//  pass: DB_PASS,
//  autoReconnect: true,
// };

// mongoose
//  .connect(url, options)
//  .then(() => console.log('connected'))
//  .catch(err => console.log(`connection error: ${err}`))