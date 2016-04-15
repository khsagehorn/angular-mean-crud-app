var express = require('express');
var router = express.Router();
var moment = require('moment');
var jwt = require('jwt-simple');
var User = require('../../models/users');
var config = require('../../_config');

router.post('/register', function(req, res, next){
  // ensure user does not already exist
  User.findOne({email: req.body.email}, function(err, existingUser){
    if (err){
      return next(err);
    }
    if (existingUser){
      return res.status(409).json({
        status: 'fail',
        message: 'Email already exists'
      });
    }
    // create a new user
    var user = new User(req.body);
    user.save(function(){
      // create token
      var token = generateToken(user);
      res.status(200).json({
        status: 'success',
        data: {
          token: token,
          user: user.email
        }
      });
    });
  });
});

router.post('/login', function(req, res, next){
  // ensure user exists
  User.findOne({email: req.body.email}, function(err, existingUser){
    if (err){
      return next(err);
    }
    if (existingUser){
      return res.status(401).json({
        status: 'fail',
        message: 'Email does not exist.'
      });
    }
    //compare plaintext password with hashed-salted password
    user.comparePassword(req.body.password, function(err, match){
      if(err){
        return next(err);
      }
      if(!match){
        return res.status(401).json({
          status: 'fail',
          message: 'Email does not exist.'
        });       
      }
      user = user.toObject();
      delete user.password;
      var token = createToken(user);
      res.status(200).json({
        status: 'success',
        data: {
          token: token,
          user: user.email
        }
      });
    });
  });
});

router.get('/logout', function(req, res, next){
});

//**** helper functions ****

// generate a token
function generateToken(user){
  var payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user._id
  };
  jwt.encode(payload, config.TOKEN_SECRET);
}

// ensure authenticated
function ensureAuthenicated(req, res, next){
  // check headers for auth token
  if (!(req.headers && req.headers.authorization)){
    return res.status(400).json({
      status: 'fail',
      message: 'No header present or no authorization header.'
    }); 
  }
  // decode token
  var header = req.headers.authorization.split(' ');
  var token = header[1];
  var payload = jwt.decode(token, config.TOKEN_SECRET);
  var now = moment().unix();

  // ensure token is valid
  if (now > payload.exp){
    return res.status(401).json({
      status: 'fail',
      message: 'Token is invalid'
    });
  }
  // ensure user is still in database
  User.findById(payload.sub, function(err, user){
    if(err){
      return next(err);
    }
    if (!user){
      return res.status(400).json({
        status: 'fail',
        message: 'User does not exist.'
      });
    }
    // attach user to request object
    req.user = user;
    // call next middleware function
    next();
  });

}


//ensure admin
function ensureAdmin(req, res, next){
  // check for user object
  // check for admin === true on user object
  if (!(req.user && req.user.admin)){
    return res.status(401).json({
      status: 'fail',
      message: 'Token is invalid'
    });
  }
  next();
}



module.exports = router;







