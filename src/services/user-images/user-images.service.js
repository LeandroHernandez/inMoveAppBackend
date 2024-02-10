// Initializes the `user-images` service on path `/user-images`
const { UserImages } = require("./user-images.class");
const createModel = require("./models/user-images.model");
const hooks = require("./user-images.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/user-images", new UserImages(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("user-images");

  service.hooks(hooks);
};
