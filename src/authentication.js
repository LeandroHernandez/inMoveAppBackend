/* eslint-disable quotes */
const {
  AuthenticationService,
  JWTStrategy,
} = require("@feathersjs/authentication");
const { LocalStrategy } = require("@feathersjs/authentication-local");
const { expressOauth } = require("@feathersjs/authentication-oauth");
const adjustTokenExpiration = require("./middleware/adjustTokenExpiration"); // Importa el middleware creado

module.exports = (app) => {
  const authentication = new AuthenticationService(app);

  authentication.register("jwt", new JWTStrategy());
  authentication.register("local", new LocalStrategy());

  app.use("/authentication", authentication);
  app.configure(expressOauth());

  app.service("authentication").hooks({
    before: {
      create: [adjustTokenExpiration()],
    },
  });
};
