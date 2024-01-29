// Initializes the `otpCodes` service on path `/otp-codes`
const { OtpCodes } = require('./otp-codes.class');
const createModel = require('./models/otp-codes.model');
const hooks = require('./otp-codes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/otp-codes', new OtpCodes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('otp-codes');

  service.hooks(hooks);
};
