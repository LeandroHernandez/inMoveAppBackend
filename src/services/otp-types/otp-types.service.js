// Initializes the `otpTypes` service on path `/otp-types`
const { OtpTypes } = require('./otp-types.class');
const createModel = require('./models/otp-types.model');
const hooks = require('./otp-types.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/otp-types', new OtpTypes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('otp-types');

  service.hooks(hooks);
};
