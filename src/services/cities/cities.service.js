// Initializes the `cities` service on path `/cities`
const { Cities } = require('./cities.class');
const createModel = require('./models/cities.model');
const hooks = require('./cities.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/cities', new Cities(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cities');

  service.hooks(hooks);
};
