/* eslint-disable quotes */
const createService = require("../../../functions/createService");
const findService = require("../../../functions/findService");

module.exports = () => {
  return async (context) => {
    const { data } = context;
    const { userPhone, userCurrentRole } = data;
    console.log("SETUSERROLE-------");
    let response = {
      alert: "Role creado correctamente",
      type: "succes",
    };

    const userDbResponse = await findService(context, { userPhone }, "users");

    if (!userDbResponse.data.length > 0) {
      response = {};
      console.log("Sin coincidencias de usuario");
      response = {
        alert: "El rol de usuario no pudo ser registrado correctamente",
        type: "error",
      };
    }

    userDbResponse.data.forEach(async (userDbResponse) => {
      const userRoleIdUser = userDbResponse.id;
      const userRolesRespone = await findService(
        context,
        { userRoleIdUser },
        "user-roles"
      );
      const userRoleDb = userRolesRespone.data.filter((userRoleItem) => {
        return userRoleItem.userRoleIdRole === userCurrentRole;
      });
      console.log({ userRolesResponeData: userRolesRespone.data, userRoleDb });
      if (!userRoleDb.length > 0) {
        await createService(context, "user-roles", {
          userRoleIdUser,
          userRoleIdRole: userCurrentRole,
          userRoleState: "Activo",
        });
      }
    });

    // context.result = response;
    return context;
  };
};
