var express = require('express');
var router = express.Router();
var Students = require('../../models/student')

router.get('/', function(req, res, next) {
  Student.find({})
    .then(function (students){
      res.status(200).json({
        status: 'success',
        data: students
      });
    });
  // Students.find({}, function(error, students){
  //   res.status(200).json(students);
  // });
});

router.get('/:id', function(req, res, next){
  Students.findOne({})
    .then(function (student){
      res.status(200).json({
        status: 'success',
        data: student
      });
    });
  // Students.findOne({}, function(error, student){
  //   res.status(200).json({
  //     status: 'success',
  //     data: student
  //   });
  // });
});

// add student
router.post('/', function(req, res, next){
  var student = Students(req.body);
  student.save()
    .then(function (student){
      res.status(200).json({
        status: 'success',
        data: student
      });
    });
  // student.save(function(error, student){
  //   res.status(200).json({
  //     status: 'success',
  //     data: student
  //   });
  // });
});

router.put('/:id', function(req, res, next){
  Students.findByIdAndUpdate({}, function(error, student){
    res.status(200).json({
      status: 'success',
      data: student
    });
  });
});


router.delete('/:id', function(req, res, next){
  Students.findByIdAndRemove({}, function(error, student){
    res.status(200).json({
      status: 'success',
      data: student
    });
  });
});

module.exports = router;
