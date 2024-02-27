/* eslint-disable quotes */
// Initializes the `states` service on path `/states`
const { States } = require("./states.class");
const createModel = require("./models/states.model");
const hooks = require("./states.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/states", new States(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("states");

  service.hooks(hooks);
};
