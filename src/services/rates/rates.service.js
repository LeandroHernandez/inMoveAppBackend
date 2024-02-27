/* eslint-disable quotes */
// Initializes the `rates` service on path `/rates`
const { Rates } = require("./rates.class");
const createModel = require("./models/rates.model");
const hooks = require("./rates.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/rates", new Rates(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("rates");

  service.hooks(hooks);
};
