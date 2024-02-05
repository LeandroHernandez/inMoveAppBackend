// Initializes the `userMessages` service on path `/user-messages`
const { UserMessages } = require("./user-messages.class");
const createModel = require("./models/user-messages.model");
const hooks = require("./user-messages.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/user-messages", new UserMessages(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("user-messages");

  service.hooks(hooks);
};
