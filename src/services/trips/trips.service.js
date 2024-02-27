/* eslint-disable quotes */
// Initializes the `trips` service on path `/trips`
const { Trips } = require("./trips.class");
const createModel = require("./models/trips.model");
const hooks = require("./trips.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/trips", new Trips(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("trips");

  service.hooks(hooks);
};
