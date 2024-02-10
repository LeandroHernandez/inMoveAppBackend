const users = require("./users/users.service.js");
const parameters = require("./parameters/parameters.service.js");
const cities = require("./cities/cities.service.js");
const otpCode = require("./otp-code/otp-code.service.js");
const otpTypes = require("./otp-types/otp-types.service.js");
const otpCodes = require("./otp-codes/otp-codes.service.js");
const device = require("./device/device.service.js");
const userMessages = require("./user-messages/user-messages.service.js");
const otpStates = require("./otp-states/otp-states.service.js");
const advertisingImages = require("./advertising-images/advertising-images.service.js");

const images = require("./images/images.service.js");

const userImages = require('./user-images/user-images.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(parameters);
  app.configure(cities);
  app.configure(otpCode);
  app.configure(otpTypes);
  app.configure(otpCodes);
  app.configure(device);
  app.configure(userMessages);
  app.configure(otpStates);
  app.configure(advertisingImages);
  app.configure(images);
  app.configure(userImages);
};
