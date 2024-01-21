// Initializes the `parameters` service on path `/parameters`
const { Parameters } = require('./parameters.class');
const createModel = require('./models/parameters.model');
const hooks = require('./parameters.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/parameters', new Parameters(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('parameters');

  service.hooks(hooks);
};
