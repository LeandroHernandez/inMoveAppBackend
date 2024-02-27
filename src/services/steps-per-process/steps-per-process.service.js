/* eslint-disable quotes */
// Initializes the `stepsPerProcess` service on path `/steps-per-process`
const { StepsPerProcess } = require("./steps-per-process.class");
const createModel = require("./models/steps-per-process.model");
const hooks = require("./steps-per-process.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/steps-per-process", new StepsPerProcess(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("steps-per-process");

  service.hooks(hooks);
};
