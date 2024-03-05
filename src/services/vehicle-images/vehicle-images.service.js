/* eslint-disable quotes */
// Initializes the `vehicle-images` service on path `/vehicle-images`
const { VehicleImages } = require("./vehicle-images.class");
const createModel = require("./models/vehicle-images.model");
const hooks = require("./vehicle-images.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/vehicle-images", new VehicleImages(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("vehicle-images");

  service.hooks(hooks);
};
