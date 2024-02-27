/* eslint-disable quotes */
// Initializes the `types` service on path `/types`
const { Types } = require("./types.class");
const createModel = require("./models/types.model");
const hooks = require("./types.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/types", new Types(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("types");

  service.hooks(hooks);
};
