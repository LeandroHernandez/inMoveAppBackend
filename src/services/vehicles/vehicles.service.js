/* eslint-disable quotes */
// Initializes the `vehicles` service on path `/vehicles`
const { Vehicles } = require("./vehicles.class");
const createModel = require("./models/vehicles.model");
const hooks = require("./vehicles.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/vehicles", new Vehicles(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("vehicles");

  service.hooks(hooks);
};
