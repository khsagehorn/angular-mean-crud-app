var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/first-mean-app',
  test: 'mongodb://localhost/first-mean-app-testing',
  production: process.env.mongoURI
};

// config.SALT_WORK_FACTOR = {
//   test: 10,
//   development: 10,
//   production: 12
// };

config.SALT_WORK_FACTOR = 10;
config.TOKEN_SECRET = "*U\xb5\xfd\x80\xe27\x81\xb3\xef\xcew\\[\xbcQi\xdd?q";

module.exports = config;