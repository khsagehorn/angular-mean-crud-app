process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app');
var should = chai.should();
var testUtilities = require('../utilities');
var testSeed = require('../../src/models/testSeed')
var Students = require('../../src/models/student');

chai.use(chaiHttp);


describe('student routes', function() {


  beforeEach(function(done) {
    //drop db
    testUtilities.dropDatabase();
    testSeed.runSeed(done);

  });

  afterEach(function(done) {
    // drop db
    testUtilities.dropDatabase(done);    

  });

  describe('/GET students', function() {
    it('should return all students', function(done) {
      chai.request(server)
      .get('/students')    
      .end(function(err, res){
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.status.should.equal('success');
        res.body.data.length.should.equal(1);
        res.body.data[0].firstName.should.equal('Kevin');
        console.log(res);
      done();
      })
    });
  });

  describe('/GET student', function() {
    it('should return one student', function(done){
      Students.findOne(function(err, student){
        var studentID = student.id;
        chai.request(server)
        .get('/students/:'+studentID)
        .end(function(err, res){
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.equal('success');
          res.body.data._id.should.equal(studentID);
          res.body.data.firstName.should.equal('Kevin');
        done();
        });
      });
    });
  });


  describe('/POST to students', function(){
    it('should post to students', function(done){
      chai.request(server)
      .post('/students')
      .end(function(err, res){
        res.status.should.equal(200);
        res.type.should.equal('application/json');
      done();

      })
    })
  })

  // describe('/PUT student', function() {
  //   it('should update one student', function(done){
  //     Students.findOne(function(err, student){
  //       var studentID = student._id;
  //       chai.request(server)
  //       .put('/students/:'+studentID)
  //       .send({firstName: 'Jerry'})
  //       .end(function(err, res){
  //         res.status.should.equal(200);
  //         res.type.should.equal('application/json');
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('status');
  //         res.body.should.have.property('data');
  //         res.body.status.should.equal('success');
  //         res.body.data._id.should.equal(studentID);
  //         res.body.data.firstName.should.equal('Jerry');
  //       done();
  //       });
  //     });
  //   });
  // });

    describe('/DELETE student', function() {
    it('should delete one student', function(done){
      Students.findOne(function(err, student){
        var studentID = student._id;
        chai.request(server)
        .delete('/students/:'+studentID)
        .end(function(err, res){
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          // res.body.should.have.property('data');
          res.body.status.should.equal('success');
        done();
        });
      });
    });
  });



});