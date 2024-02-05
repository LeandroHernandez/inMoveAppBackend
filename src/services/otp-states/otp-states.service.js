// Initializes the `otpStates` service on path `/otp-states`
const { OtpStates } = require("./otp-states.class");
const createModel = require("./models/otp-states.model");
const hooks = require("./otp-states.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/otp-states", new OtpStates(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("otp-states");

  service.hooks(hooks);
};
