/* eslint-disable quotes */
// Initializes the `VehicleClassifications` service on path `/vehicle-classifications`
const { VehicleClassifications } = require("./vehicle-classifications.class");
const createModel = require("./models/vehicle-classifications.model");
const hooks = require("./vehicle-classifications.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/vehicle-classifications", new VehicleClassifications(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("vehicle-classifications");

  service.hooks(hooks);
};
