const mongoose = require('mongoose');

async function connectDatabase() {
  await mongoose.connect(process.env.Database_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
module.exports = {
  connectDatabase,
}