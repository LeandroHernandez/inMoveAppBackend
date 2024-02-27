/* eslint-disable quotes */
// Initializes the `tripSpecifications` service on path `/trip-specifications`
const { TripSpecifications } = require("./trip-specifications.class");
const createModel = require("./models/trip-specifications.model");
const hooks = require("./trip-specifications.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/trip-specifications", new TripSpecifications(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("trip-specifications");

  service.hooks(hooks);
};
