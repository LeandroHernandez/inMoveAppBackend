/* eslint-disable quotes */
// Initializes the `stepsPerUserProcess` service on path `/steps-per-user-process`
const { StepsPerUserProcess } = require("./steps-per-user-process.class");
const createModel = require("./models/steps-per-user-process.model");
const hooks = require("./steps-per-user-process.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/steps-per-user-process", new StepsPerUserProcess(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("steps-per-user-process");

  service.hooks(hooks);
};
