const findService = require("../../../functions/findService");
// const fs = require("fs");
const fs = require("node:fs");
const path = require("path");

module.exports = () => {
  return async (context) => {
    // const { data } = context;
    const { params } = context;
    const id = JSON.parse(context.id);
    // let response = {};

    // console.log({ params, id, typeId: typeof id, idParse: JSON.parse(id) });
    const userImageDb = await findService(context, { id }, "user-images");

    if (userImageDb.data.length > 0) {
      // const rutaArchivo = path.join(__dirname, "public", "images", nombreArchivo);
      const rutaArchivo = path.join(
        __dirname,
        `../../../../public/${userImageDb.data[0].userFileUrl}`
        // `../../../../`
      );

      console.log({ rutaArchivo });

      // Verificar si el archivo existe antes de intentar eliminarlo
      fs.access(rutaArchivo, fs.constants.F_OK, async (err) => {
        if (err) {
          const userMessageResponse = await findService(
            context,
            {
              userMessageResult: "succes",
              userMessageReference: "user image delete",
            },
            "user-messages"
          );
          context.result = {
            alert: userMessageResponse.data[0].userMessage
              ? userMessageResponse.data[0].userMessage
              : "Imagen eliminada correctamente",
            type: "succes",
          };
          console.error("El archivo no existe o no se puede acceder.");
          return context;
        }

        // El archivo existe, intenta eliminarlo
        fs.unlink(rutaArchivo, async (err) => {
          if (err) {
            const userMessageResponse = await findService(
              context,
              {
                userMessageResult: "fail",
                userMessageReference: "user image delete",
              },
              "user-messages"
            );
            const response = {
              alert: userMessageResponse.data[0].userMessage
                ? userMessageResponse.data[0].userMessage
                : "Error al intentar eliminar el archivo",
              type: "error",
              error: err,
            };
            console.error("Error al intentar eliminar el archivo:", err);
            return response;
          }

          console.log("El archivo se eliminó correctamente.");
        });
      });
    } else {
      const userMessageResponse = await findService(
        context,
        {
          userMessageResult: "id not found error",
          userMessageReference: "user image delete",
        },
        "user-messages"
      );
      context.result = {
        alert: userMessageResponse.data[0].userMessage
          ? userMessageResponse.data[0].userMessage
          : "Estimado usuario el ID ingresado es invalido, el ID ingresado no corresponde a ninguna imagen en la base de datos",
        type: "error",
      };
    }
    // console.log({ params });
    // context.result = response;
    return context;
  };
};
