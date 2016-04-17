var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/first-mean-app',
  test: 'mongodb://localhost/first-mean-app-testing',
  production: process.env.mongoURI
};



config.SALT_WORK_FACTOR = 10;
config.TOKEN_SECRET = '\xb5\xfd\x80\xe27\x81\xb3\xef\xcew\\[\xbcQi\xdd?q';

module.exports = config;