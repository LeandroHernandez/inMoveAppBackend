/* eslint-disable quotes */
const { authenticate } = require("@feathersjs/express");
const findServiceApp = require("../../functions/findServiceApp");

module.exports = function (app) {
  app.post("/query-service", authenticate("jwt"), async (req, res) => {
    try {
      const { body } = req;
      // const { serviceToGet } = body;
      const { serviceToQuery, queryAction, id } = body;
      // if ("serviceToGet" in body) {
      if ("serviceToQuery" in body) {
        // delete body.serviceToGet;
        delete body.serviceToQuery;
      }
      if ("queryAction" in body) {
        // delete body.serviceToGet;
        delete body.queryAction;
      }
      if ("id" in body) {
        // delete body.serviceToGet;
        delete body.id;
      }

      let response = {
        status: 500,
        json: {
          alert:
            // "No fue posible realizar la busqueda, por favor verifique los valores ingresados",
            "No fue posible realizar la consulta, por favor verifique los valores ingresados",
          type: "error",
        },
      };

      if (!serviceToQuery) {
        res.status(400).json({
          data: `No fue proporcionado ningun en el campo serviceToQuery el cual es necesario para cualquier consulta`,
          type: "error",
        });
      }

      let serviceDbResponse = null;
      if (queryAction === "Register" || queryAction === "Create") {
        serviceDbResponse = await app.service(serviceToQuery).create(body);
      }
      if (
        queryAction === "Update" ||
        queryAction === "Patch" ||
        queryAction === "Delete" ||
        queryAction === "Remove"
      ) {
        if (!id) {
          res.status(400).json({
            data: `El campo id es necesario para las consultas de edición o eliminación`,
            type: "error",
          });
        }
        const recordToUpdateOrDelete = await findServiceApp(
          app,
          { id },
          serviceToQuery
        );
        if (!recordToUpdateOrDelete.data.length > 0) {
          res.status(400).json({
            data: `No hay ningún registro en la base de datos correspondiente al id ingresado`,
            type: "error",
          });
        }
        if (queryAction === "Update" || queryAction === "Patch") {
          serviceDbResponse = await app
            .service(serviceToQuery)
            .update(id, body);
        }
        if (queryAction === "Delete" || queryAction === "Remove") {
          // serviceDbResponse = await app
          //   .service(serviceToQuery)
          //   .update(id, { ...recordToUpdateOrDelete.data[0], state: false });
        }
      }
      if (!queryAction || queryAction === "Get" || queryAction === "Find") {
        serviceDbResponse = await findServiceApp(app, body, serviceToQuery);
      }

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
