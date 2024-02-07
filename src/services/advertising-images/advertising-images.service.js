// Initializes the `advertising-images` service on path `/advertising-images`
const { AdvertisingImages } = require("./advertising-images.class");
const createModel = require("./models/advertising-images.model");
const hooks = require("./advertising-images.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/advertising-images", new AdvertisingImages(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("advertising-images");

  service.hooks(hooks);
};
