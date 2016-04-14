var Students = require('./student')

var data = [
  {
    firstName: 'Kevin',
    lastName: 'Schwartz',
    year: 2001
  }
];


function runSeed(done){
  var student = new Students(data[0]);
  student.save(function(err, res){
    done()
  });
}

module.exports = {
  runSeed: runSeed
}