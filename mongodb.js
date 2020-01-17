/* Mongoose connection using events */
const mongoose = require('mongoose');
const { DB_CLUSTER, DB_USER, DB_PASS, DB_HOST } = require('./constants');
// const { DB_CLUSTER, DB_USER, DB_PASS, DB_HOST } = process.env.DB_CLUSTER ? process.env : require('./constants');
// const { DB_CLUSTER, DB_USER, DB_PASS, DB_HOST } = process.env;

// mongodb+srv://orbrch1:<password>@tweetmongodbcluster-bkahm.mongodb.net/test?retryWrites=true&w=majority
const connectionString = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}-${DB_HOST}`;
// console.log(connectionString);

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true // To remove annoying warning
};

mongoose.connect(connectionString, options)
    .then(db => console.log(`MongoDB is initialized & connected to ${db.connection.name}`))
    .catch(err => console.log('Connection Error', err));

module.exports = {
    mongoDbOptions: options,
    mongoDbUrl: connectionString
};