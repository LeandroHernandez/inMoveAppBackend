const findService = require("../../../functions/findService");
// const fs = require("fs");
const fs = require("node:fs");
const path = require("path");

module.exports = () => {
  // return async (context) => {
  //   // const { data } = context;
  //   const { params } = context;
  //   const { headers } = params;
  //   const id = JSON.parse(headers.id);
  //   let response = {};

  //   console.log({ params, id, typeId: typeof id, idParse: JSON.parse(id) });
  //   // console.log({ params });

  //   const advertisingImageDb = await findService(
  //     context,
  //     { id },
  //     "advertising-images"
  //   );

  //   if (advertisingImageDb.data.length > 0) {
  //     console.log({ advertisingImageDbData: advertisingImageDb.data });
  //     // const rutaArchivo = path.join(__dirname, "public", "images", nombreArchivo);
  //     const rutaArchivo = path.join(
  //       __dirname,
  //       `../../../../${advertisingImageDb.data[0].fileUrl.slice(1)}`
  //       // `../../../../`
  //     );

  //     console.log({ rutaArchivo });

  //     // Verificar si el archivo existe antes de intentar eliminarlo
  //     fs.access(rutaArchivo, fs.constants.F_OK, (err) => {
  //       if (err) {
  //         console.error("El archivo no existe o no se puede acceder.");
  //         return;
  //       }

  //       // El archivo existe, intenta eliminarlo
  //       fs.unlink(rutaArchivo, (err) => {
  //         if (err) {
  //           console.error("Error al intentar eliminar el archivo:", err);
  //           return;
  //         }
  //         console.log("El archivo se eliminó correctamente.");
  //       });
  //     });
  //   }

  //   context.result = response;
  // };
  return async (context) => {
    // const { data } = context;
    const { params } = context;
    const id = JSON.parse(context.id);
    // let response = {};

    // console.log({ params, id, typeId: typeof id, idParse: JSON.parse(id) });
    const advertisingImageDb = await findService(
      context,
      { id },
      "advertising-images"
    );

    if (advertisingImageDb.data.length > 0) {
      console.log({ advertisingImageDbData: advertisingImageDb.data });
      // const rutaArchivo = path.join(__dirname, "public", "images", nombreArchivo);
      const rutaArchivo = path.join(
        __dirname,
        `../../../../${advertisingImageDb.data[0].fileUrl}`
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
              userMessageReference: "delete advertising Image",
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
                userMessageResult: "error",
                userMessageReference: "delete advertising Image",
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
      // userMessageReference: "delete advertising Image",
      const userMessageResponse = await findService(
        context,
        {
          userMessageResult: "not db image found",
          userMessageReference: "delete advertising Image",
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
