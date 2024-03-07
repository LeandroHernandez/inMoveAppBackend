/* eslint-disable quotes */
const { authenticate } = require("@feathersjs/express");
const findServiceApp = require("../../functions/findServiceApp");

module.exports = function (app) {
  app.post("/query-service", authenticate("jwt"), async (req, res) => {
    try {
      const { body } = req;
      const { serviceToGet } = body;
      if ("serviceToGet" in body) {
        delete body.serviceToGet;
      }
      let response = {
        status: 500,
        json: {
          alert:
            "No fue posible realizar la busqueda, por favor verifique los valores ingresados",
          type: "succes",
        },
      };

      const serviceDbResponse = await findServiceApp(app, body, serviceToGet);

      if (!serviceDbResponse) {
        res.status(response.status).json(response.json);
      }

      res.status(200).json(serviceDbResponse);
    } catch (error) {
      const response = {
        status: 500,
        json: {
          alert:
            // userMessageResponseError.data.length > 0
            //   ? userMessageResponseError.data[0].userMessage
            //   : "Error al subir la imagen fsdda",
            "Error al consultar al servicio query-service",
          type: "error",
        },
      };
      res.status(response.status).json(response.json);
    }
  });
};
