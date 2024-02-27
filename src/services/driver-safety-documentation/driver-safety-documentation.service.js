/* eslint-disable quotes */
// Initializes the `DriverSafetyDocumentation` service on path `/driver-safety-documentation`
const {
  DriverSafetyDocumentation,
} = require("./driver-safety-documentation.class");
const createModel = require("./models/driver-safety-documentation.model");
const hooks = require("./driver-safety-documentation.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use(
    "/driver-safety-documentation",
    new DriverSafetyDocumentation(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service("driver-safety-documentation");

  service.hooks(hooks);
};
