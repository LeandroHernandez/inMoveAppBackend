/* eslint-disable quotes */
// Initializes the `drivers` service on path `/drivers`
const { Drivers } = require("./drivers.class");
const createModel = require("./models/drivers.model");
const hooks = require("./drivers.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/drivers", new Drivers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("drivers");

  service.hooks(hooks);
};
