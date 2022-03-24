const mongoose = require('mongoose')

let connectionString = "mongodb://localhost:27017/lott";

mongoose.connect(connectionString);

module.exports = mongoose

