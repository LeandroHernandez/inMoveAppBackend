// middleware/adjustTokenExpiration.js
const findService = require("../functions/findService");

module.exports = function (options = {}) {
  return async (context) => {
    const { params, app, data } = context;
    // const { user } = params;

    // !
    // !
    // !
    // !
    // !
    // !
    // !
    // !
    // !
    // PENDIENTE INTEGRAR RESPUESTAS DE USUARIO CON TABLA DE MENSAJES DE USUARIO

    const { userPhone, userCurrentRole } = data;
    let response = {
      alert: "",
      type: "",
    };
    const userDbReponse = await findService(context, { userPhone }, "users");
    if (!userDbReponse.data.length > 0) {
      console.log("El usuario no se encuentra registrado en la base de datos");
      response = {
        alert:
          " No se ha encontrado ningun usuario en la base de datos correspondiente al numero de telefono ingresado ",
        type: "error",
      };
      context.result = response;
      return context;
    }
    const userRolesReponse = await findService(
      context,
      { userRoleIdUser: userDbReponse.data[0].id },
      "user-roles"
    );
    const userValid = userRolesReponse.data.filter((userRoleItem) => {
      return userRoleItem.userRoleIdRole === userCurrentRole;
    });
    if (!userValid.length > 0) {
      console.log(
        "El usuario ingresado no tiene permisos para acceder por medio de este rol de usuario"
      );
      response = {
        alert:
          "El usuario ingresado no tiene permisos para acceder por medio de este rol de usuario",
        type: "error",
      };
      context.result = response;
      return context;
    }

    const userRoleDb = await findService(
      context,
      { id: userCurrentRole },
      "roles"
    );

    if (!userRoleDb.data.length > 0) {
      response = {
        alert:
          "No fue posible verificar el rol ingresado para el proceso de autenticación",
        type: "error",
      };
      context.result = response;
      return context;
    }

    console.log({ userRoleDbData: userRoleDb.data });
    const jwtOptions = app.get("authentication").jwtOptions;
    if ("expiresIn" in jwtOptions) {
      // Eliminar la propiedad "description" del jwtOptions
      delete jwtOptions.expiresIn;
    }

    if (
      userRoleDb.data[0].roleName !== "Pasajero" &&
      userRoleDb.data[0].roleName !== "Conductor" &&
      userRoleDb.data[0].roleName !== "Cliente"
    ) {
      jwtOptions.expiresIn = "5m";
    }

    return context;
  };
};
