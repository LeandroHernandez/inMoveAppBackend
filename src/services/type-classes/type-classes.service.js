/* eslint-disable quotes */
// Initializes the `typeClasses` service on path `/type-classes`
const { TypeClasses } = require("./type-classes.class");
const createModel = require("./models/type-classes.model");
const hooks = require("./type-classes.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/type-classes", new TypeClasses(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("type-classes");

  service.hooks(hooks);
};
