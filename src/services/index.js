const users = require('./users/users.service.js');
const parameters = require('./parameters/parameters.service.js');
const cities = require('./cities/cities.service.js');
const otpCode = require('./otp-code/otp-code.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(parameters);
  app.configure(cities);
  app.configure(otpCode);
};
