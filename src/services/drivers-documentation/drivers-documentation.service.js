/* eslint-disable quotes */
// Initializes the `driversDocumentation` service on path `/drivers-documentation`
const { DriversDocumentation } = require("./drivers-documentation.class");
const createModel = require("./models/drivers-documentation.model");
const hooks = require("./drivers-documentation.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/drivers-documentation", new DriversDocumentation(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("drivers-documentation");

  service.hooks(hooks);
};
