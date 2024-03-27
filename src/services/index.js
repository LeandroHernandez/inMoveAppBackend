/* eslint-disable linebreak-style */
/* eslint-disable quotes */
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

const image = require("./image/image.service.js");

const userImages = require("./user-images/user-images.service.js");

const roles = require("./roles/roles.service.js");

const userRoles = require("./user-roles/user-roles.service.js");

const drivers = require("./drivers/drivers.service.js");

const driversDocumentation = require("./drivers-documentation/drivers-documentation.service.js");

const typeClasses = require("./type-classes/type-classes.service.js");

const types = require("./types/types.service.js");

const categories = require("./categories/categories.service.js");

const vehicles = require("./vehicles/vehicles.service.js");

const models = require("./models/models.service.js");

const brands = require("./brands/brands.service.js");

const driverSafetyDocumentation = require("./driver-safety-documentation/driver-safety-documentation.service.js");

const vehicleClassifications = require("./vehicle-classifications/vehicle-classifications.service.js");

const states = require("./states/states.service.js");

const exclusiveUsers = require("./exclusive-users/exclusive-users.service.js");

const companies = require("./companies/companies.service.js");

const steps = require("./steps/steps.service.js");

const stepsPerProcess = require("./steps-per-process/steps-per-process.service.js");

const stepsPerUserProcess = require("./steps-per-user-process/steps-per-user-process.service.js");

const reasons = require("./reasons/reasons.service.js");

const updates = require("./updates/updates.service.js");

const settings = require("./settings/settings.service.js");

const trips = require("./trips/trips.service.js");

const rates = require("./rates/rates.service.js");

const ratings = require("./ratings/ratings.service.js");

const tripSpecifications = require("./trip-specifications/trip-specifications.service.js");

const vehicleImages = require("./vehicle-images/vehicle-images.service.js");

const images = require("./images/images.service.js");
const queryService = require("./query-services/query-service.service.js");

const phoneAndEmailHistoric = require('./phone-and-email-historic/phone-and-email-historic.service.js');

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
  app.configure(image);
  app.configure(userImages);
  app.configure(roles);
  app.configure(userRoles);
  app.configure(drivers);
  app.configure(driversDocumentation);
  app.configure(typeClasses);
  app.configure(types);
  app.configure(categories);
  app.configure(vehicles);
  app.configure(models);
  app.configure(brands);
  app.configure(driverSafetyDocumentation);
  app.configure(vehicleClassifications);
  app.configure(states);
  app.configure(exclusiveUsers);
  app.configure(companies);
  app.configure(steps);
  app.configure(stepsPerProcess);
  app.configure(stepsPerUserProcess);
  app.configure(reasons);
  app.configure(updates);
  app.configure(settings);
  app.configure(trips);
  app.configure(rates);
  app.configure(ratings);
  app.configure(tripSpecifications);
  app.configure(vehicleImages);
  app.configure(images);
  app.configure(queryService);
  app.configure(phoneAndEmailHistoric);
};
