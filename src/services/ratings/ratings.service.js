/* eslint-disable quotes */
// Initializes the `ratings` service on path `/ratings`
const { Ratings } = require("./ratings.class");
const createModel = require("./models/ratings.model");
const hooks = require("./ratings.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/ratings", new Ratings(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("ratings");

  service.hooks(hooks);
};
