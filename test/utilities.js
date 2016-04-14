var mongoose = require('mongoose');

// create database


// drop database
function dropDatabase(done) {
  mongoose.connection.db.dropDatabase();
  if (done){
    done();
  }
}

module.exports = {
  dropDatabase: dropDatabase
}