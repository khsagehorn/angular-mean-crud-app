var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
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

var student = new Student({
  firstName: 'Doug',
  lastName: 'Funny',
  year: 3
});

student.save()
  .then(function (student) { console.log('success:', student)})
  .catch(function (error) { console.log('error:', error)});

Student.find({}, function (err, student){
  if (err) { console.log('Error', err); }
})

module.exports = Student;