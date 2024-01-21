// Initializes the `otp-code` service on path `/otp-code`
const { OtpCode } = require('./otp-code.class');
const hooks = require('./otp-code.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/otp-code', new OtpCode(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('otp-code');

  service.hooks(hooks);
};
