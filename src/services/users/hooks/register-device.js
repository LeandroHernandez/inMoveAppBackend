/* eslint-disable quotes */
const findService = require("../../../functions/findService");
const createService = require("../../../functions/createService");
module.exports = () => {
  return async (context) => {
    // const { app, method, result, params, data } = context;
    const { data } = context;

    let response = {};

    const userDbResponse = await findService(
      context,
      { userPhone: data.userPhone },
      "users"
    );
    if (!userDbResponse.data.length > 0) {
      response.data = {
        alert: "El usuario no se encuentra registrado",
        type: "error",
      };
    } else {
      createService(context, "device", {
        ...data.device,
        deviceUser: userDbResponse.data[0].id,
      })
        .then((deviceCreated) => {
          response.data = {
            alert: "Usuario registrado correctamente",
            type: "success",
            user: { ...userDbResponse.data[0], device: { ...deviceCreated } },
          };
        })
        .catch((error) => {
          console.log({ error });
          response.data = {
            alert: "No se pudo registrar el dispositivo",
            type: "error",
          };
        });
    }

    // context.result = response;
  };
};
