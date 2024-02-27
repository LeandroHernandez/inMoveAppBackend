/* eslint-disable quotes */
// Initializes the `updates` service on path `/updates`
const { Updates } = require("./updates.class");
const createModel = require("./models/updates.model");
const hooks = require("./updates.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/updates", new Updates(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("updates");

  service.hooks(hooks);
};
