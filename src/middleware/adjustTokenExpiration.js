/* eslint-disable linebreak-style */
/* eslint-disable quotes */
// middleware/adjustTokenExpiration.js
const findService = require("../functions/findService");

module.exports = function () {
  return async (context) => {
    const { app, data } = context;
    const { userPhone, roleName, strategy } = data;

    console.log(userPhone, roleName, strategy);

    // /**
    //  * *** la segunda autenticacion se realiza con jwt para autenticar el client socket ***
    //  */
    if (strategy === "jwt") return context;
    let response = {
      alert: "",
      type: "",
    };
    // let userMessageResponse = { data: [] };
    let userMessageResponse = {};
    const userDbReponse = await findService(context, { userPhone }, "users");
    if (!userDbReponse.data.length > 0) {
      console.log("El usuario no se encuentra registrado en la base de datos");
      userMessageResponse = await findService(
        context,
        {
          userMessageResult: "user not found error",
          userMessageReference: "generate accesToken",
        },
        "user-messages"
      );
      response = {
        alert: userMessageResponse.data[0].userMessage
          ? userMessageResponse.data[0].userMessage
          : " No se ha encontrado ningun usuario en la base de datos correspondiente al numero de telefono ingresado ",
        type: "error",
      };
      context.result = response;
      return context;
    }
    const roleDbResponse = await findService(context, { roleName }, "roles");
    if (!roleDbResponse.data.length > 0) {
      console.log(
        "El nombre de rol ingresado no corresponse a ningún rol registrado en la base de datos"
      );
      userMessageResponse = await findService(
        context,
        {
          userMessageResult: "rol not found error",
          userMessageReference: "generate accesToken",
        },
        "user-messages"
      );
      response = {
        alert: userMessageResponse.data[0].userMessage
          ? userMessageResponse.data[0].userMessage
          : " El nombre de rol ingresado no corresponse a ningún rol registrado en la base de datos ",
        type: "error",
      };
      context.result = response;
      return context;
    }
    const userRolesReponse = await findService(
      context,
      {
        userRoleIdUser: userDbReponse.data[0].id,
        userRoleIdRole: roleDbResponse.data[0].id,
      },
      "user-roles"
    );
    // const userValid = userRolesReponse.data.filter((userRoleItem) => {
    //   return userRoleItem.userRoleIdRole === userCurrentRole;
    // });
    if (!userRolesReponse.data.length > 0) {
      console.log({ withOutResponseCondition: true });
      console.log(
        "El usuario ingresado no tiene permisos para acceder por medio de este rol de usuario"
      );
      userMessageResponse = await findService(
        context,
        {
          userMessageResult: "without acces to role error",
          userMessageReference: "generate accesToken",
        },
        "user-messages"
      );
      response = {
        alert: userMessageResponse.data[0].userMessage
          ? userMessageResponse.data[0].userMessage
          : "El usuario ingresado no tiene permisos para acceder por medio de este rol de usuario",
        type: "error",
      };
      console.log({ response });
      context.result = response;
      return context;
    }

    // const userRoleDb = await findService(
    //   context,
    //   { id: userCurrentRole },
    //   "roles"
    // );

    // if (!userRoleDb.data.length > 0) {
    //   response = {
    //     alert:
    //       "No fue posible verificar el rol ingresado para el proceso de autenticación",
    //     type: "error",
    //   };
    //   context.result = response;
    //   return context;
    // }

    // console.log({ userRoleDbData: userRoleDb.data });
    const jwtOptions = app.get("authentication").jwtOptions;
    if ("expiresIn" in jwtOptions) {
      // Eliminar la propiedad "description" del jwtOptions
      delete jwtOptions.expiresIn;
    }

    if (
      roleName !== "Pasajero" &&
      roleName !== "Conductor" &&
      roleName !== "Cliente"
    ) {
      const jwtTimeLifeResponse = await findService(
        context,
        {
          parameterName: "jwtLifeTime",
          parameterState: true,
        },
        "parameters"
      );
      jwtOptions.expiresIn =
        jwtTimeLifeResponse.data.length > 0
          ? jwtTimeLifeResponse.data[0].parameterValue
          : "5m";
    }

    return context;
  };
};
