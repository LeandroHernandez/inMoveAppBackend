// const {
//   AuthenticationService,
//   JWTStrategy,
// } = require("@feathersjs/authentication");
// const { LocalStrategy } = require("@feathersjs/authentication-local");
// const { expressOauth } = require("@feathersjs/authentication-oauth");

// const findServiceApp = require("./functions/findServiceApp");

// module.exports = (app) => {
//   const authentication = new AuthenticationService(app);

//   authentication.register("jwt", new JWTStrategy());
//   authentication.register("local", new LocalStrategy());

//   const adjustTokenExpiration = async (req, res, next) => {
//     try {
//       console.log("*************************************");
//       console.log("*************************************");
//       console.log("*************************************");
//       console.log("*************************************");
//       console.log({ authReqCondition: true });
//       const { userPhone, userCurrentRole } = req.body;
//       console.log({ req, body: req.body });
//       const userDbReponse = await findServiceApp(app, { userPhone }, "users");
//       if (!userDbReponse.data.length > 0) {
//         console.log(
//           "El usuario no se encuentra registrado en la base de datos"
//         );
//         return res.status(400).json({
//           alert:
//             "El numero de telefono ingresado no corresponde a ningun usuario registrado en la base de datos",
//           type: "error",
//         });
//       }
//       const userRolesReponse = await findServiceApp(
//         app,
//         { userRoleIdUser: userDbReponse.data[0].id },
//         "user-roles"
//       );
//       const userValid = userRolesReponse.data.filter((userRoleItem) => {
//         return userRoleItem.userRoleIdRole === userCurrentRole;
//       });
//       if (!userValid.length > 0) {
//         console.log(
//           "El usuario ingresado no tiene permisos para acceder por medio de este rol de usuario"
//         );
//         return res.status(400).json({
//           alert:
//             "El usuario ingresado no tiene permisos para acceder por medio de este rol de usuario",
//           type: "error",
//         });
//       }

//       const userRoleDb = await findServiceApp(
//         app,
//         { id: userCurrentRole },
//         "roles"
//       );

//       if (!userRoleDb.data.length > 0) {
//         return res.status(500).json({
//           alert:
//             "No fue posible verificar el rol ingresado para el proceso de autenticación",
//           type: "error",
//         });
//       }

//       let expiresIn = "10s"; // Tiempo de vida predeterminado para el usuario
//       if (userRoleDb.data[0].roleName === "Pasajero") {
//         expiresIn = "10s";
//       } else if (userRoleDb.data[0].roleName === "Conductor") {
//         expiresIn = "7d"; // Tiempo de vida extendido para los conductores
//       } else if (userRoleDb.data[0].roleName === "Administrador") {
//         expiresIn = "30d"; // Tiempo de vida extendido para los administradores
//       } else if (userRoleDb.data[0].roleName === "Agente") {
//         expiresIn = "30d"; // Tiempo de vida extendido para los administradores
//       }

//       // // Actualizar el tiempo de vida del token en la estrategia JWT
//       // const jwtStrategy = app.service("authentication").getStrategies("jwt")[0];
//       // if (jwtStrategy && jwtStrategy.options) {
//       //   jwtStrategy.options.jwtOptions.expiresIn = expiresIn;
//       // } else {
//       //   console.error("Error: jwtStrategy u opciones de JWT no definidas.");
//       // }

//       // Obtener la estrategia JWT
//       const jwtStrategy = app.service("authentication").getStrategies("jwt");
//       console.log({ jwtStrategy });
//       if (
//         jwtStrategy &&
//         jwtStrategy.options &&
//         jwtStrategy.options.jwtOptions
//       ) {
//         jwtStrategy.options.jwtOptions.expiresIn = expiresIn;
//       } else {
//         console.error("Error: opciones de JWT no definidas.");
//       }

//       console.log({ req });
//       console.log("*************************************");
//       console.log("*************************************");
//       console.log("*************************************");
//       console.log("*************************************");

//       next();
//     } catch (error) {
//       // Manejar cualquier error que pueda ocurrir dentro del middleware
//       console.error("Error en el middleware adjustTokenExpiration:", error);
//       next(error);
//     }
//   };

//   app.use("/authentication", authentication, adjustTokenExpiration);
//   // app.use("/authentication", authentication);
//   app.configure(expressOauth());
// };

// src/authentication.js

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

  const authSvc = app.get("authentication");
  console.log({ authSvc });

  // Agregar el middleware para ajustar el tiempo de vida del token JWT
  app.service("authentication").hooks({
    before: {
      create: [adjustTokenExpiration()],
    },
  });
};
