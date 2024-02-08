// Initializes the `images` service on path `/images`
const { authenticate } = require("@feathersjs/express");
const multer = require("multer");
const fs = require("node:fs");
const findServiceApp = require("../../functions/findServiceApp");

const upload = multer({ dest: "public/images/" });

function saveImage(file) {
  const newPath = `./public/images/${file.originalname}`;
  // console.log({ file, newPath, originalname: file.originalname });
  fs.renameSync(file.path, newPath);
  return newPath;
}

module.exports = function (app) {
  // Initialize our service with any options it requires
  // app.use('/images', new Images(options, app));
  app.post(
    "/images",
    authenticate("jwt"),
    upload.single("imagePerfil"),
    async (req, res, next) => {
      console.log({ req });
      const { file, body } = req;
      // const imageUrl = saveImage(req.file);
      const imageUrl = saveImage(file);
      // console.log({ req, body, file, imageUrl });

      try {
        let response = {
          status: 200,
          json: {
            alert: "Imagen subida correctamente",
            type: "succes",
          },
        };
        // Aquí puedes obtener la URL de la imagen guardada
        // const imageUrl = "/public/" + file.filename;

        const advertisingImageCreated = await app
          .service("advertising-images")
          .create({
            fileName: body.fileName ? body.fileName : file.originalname,
            fileDescription: body.fileDescription,
            fileReference: body.fileReference,
            fileState: body.fileState,
            fileExpirerDate: body.fileExpirerDate,
            fileUrl: imageUrl,
          });

        if (!advertisingImageCreated) {
          console.log("No fue posible registrar la imagen en la base de datos");
          const userMessageResponse = await findServiceApp(
            app,
            {
              userMessageResult: "error",
              userMessageReference: "register advertising Image",
            },
            "user-messages"
          );
          res
            .status(500)
            // .json({ message: "Imagen subida exitosamente", imageUrl });
            .json({
              alert:
                userMessageResponse.data.length > 0
                  ? userMessageResponse.data[0].userMessage
                  : "No fue posible registrar la imagen en la base de datos",
              type: "error",
            });
        }

        const userMessageResponse = await findServiceApp(
          app,
          {
            userMessageResult: "succes",
            userMessageReference: "upload advertising Image",
          },
          "user-messages"
        );
        if (userMessageResponse.data.length > 0) {
          response = {
            status: 200,
            json: {
              alert: userMessageResponse.data[0].userMessage,
              type: "succes",
            },
          };
        } else {
          console.log(
            "No se encontraron concidencias en tabla de mensajes de usuario"
          );
          response = {
            status: 200,
            json: {
              alert: "Imagen subida correctamente",
              type: "succes",
            },
          };
        }

        // res
        //   .status(201)
        //   // .json({ message: "Imagen subida exitosamente", imageUrl });
        //   .json({ message: "Imagen subida exitosamente" });
        res
          .status(response.status)
          // .json({ message: "Imagen subida exitosamente", imageUrl });
          .json(response.json);
      } catch (error) {
        const userMessageResponseError = await findServiceApp(
          app,
          {
            userMessageResult: "error",
            userMessageReference: "upload error advertising Image",
          },
          "user-messages"
        );
        let response = {
          status: 500,
          json: {
            alert:
              userMessageResponseError.data.length > 0
                ? userMessageResponseError.data[0].userMessage
                : "Error al subir la imagen",
            type: "error",
          },
        };
        console.error("Error al subir la imagen:", error);
        // res.status(500).json({ error: "Error al subir la imagen" });
        res.status(response.status).json(response.json);
      }
    }
  );

  // Get our initialized service so that we can register hooks
  // const service = app.service('images');

  // service.hooks(hooks);
};
