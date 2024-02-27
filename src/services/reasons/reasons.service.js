/* eslint-disable quotes */
// Initializes the `reasons` service on path `/reasons`
const { Reasons } = require("./reasons.class");
const createModel = require("./models/reasons.model");
const hooks = require("./reasons.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/reasons", new Reasons(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("reasons");

  service.hooks(hooks);
};
