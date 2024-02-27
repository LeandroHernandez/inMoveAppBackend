/* eslint-disable quotes */
// Initializes the `exclusiveUsers` service on path `/exclusive-users`
const { ExclusiveUsers } = require("./exclusive-users.class");
const createModel = require("./models/exclusive-users.model");
const hooks = require("./exclusive-users.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/exclusive-users", new ExclusiveUsers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("exclusive-users");

  service.hooks(hooks);
};
