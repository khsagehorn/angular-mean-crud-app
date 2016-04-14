var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});

var Student = mongoose.model('student', StudentSchema);

Student.find({}, function (err, student){
  if (err) { console.log('Error', err); }
})

module.exports = Student;