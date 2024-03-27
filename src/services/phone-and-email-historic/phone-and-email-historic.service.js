/* eslint-disable quotes */
// Initializes the `phoneAndEmailHistoric` service on path `/phone-and-email-historic`
const { PhoneAndEmailHistoric } = require("./phone-and-email-historic.class");
const createModel = require("./models/phone-and-email-historic.model");
const hooks = require("./phone-and-email-historic.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/phone-and-email-historic", new PhoneAndEmailHistoric(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("phone-and-email-historic");

  service.hooks(hooks);
};
