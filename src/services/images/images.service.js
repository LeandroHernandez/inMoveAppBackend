// Initializes the `images` service on path `/images`
const { authenticate } = require("@feathersjs/express");
const multer = require("multer");
const fs = require("node:fs");
const findServiceApp = require("../../functions/findServiceApp");

const upload = multer({ dest: "public/images/" });

function saveImage(file, userCondition) {
  const newPath = `./public/images/${
    !userCondition ? "advertising-images" : "user-images"
  }/ ${file.originalname}`;
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
      const imageUrl = saveImage(file, false);
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

  app.post(
    "/images/user",
    // authenticate("jwt"),
    upload.single("imagePerfil"),
    // async (req, res, next) => {
    async (req, res) => {
      // console.log({ req });
      const { file, body } = req;
      const device = JSON.parse(body.device);
      const fileData = JSON.parse(body.fileData);
      // const imageUrl = saveImage(req.file);
      const imageUrl = saveImage(file, true);
      console.log({
        req,
        body,
        file,
        imageUrl,
        device,
        fileData,
      });

      let userMessageResponse = null;
      let response = {
        status: 500,
        json: {
          alert: "",
          type: "",
        },
      };
      try {
        userMessageResponse = await findServiceApp(
          app,
          {
            userMessageResult: "succes",
            userMessageReference: "user register with upload image",
          },
          "user-messages"
        );
        response = {
          status: 200,
          json: {
            alert:
              userMessageResponse.data.length > 0
                ? userMessageResponse.data[0].userMessage
                : "Usuario registrado correctamente",
            type: "succes",
          },
        };
        // Aquí puedes obtener la URL de la imagen guardada
        // const imageUrl = "/public/" + file.filename;

        const userDbResponse = await findServiceApp(
          app,
          { userPhone: body.userPhone },
          "users"
        );
        let userId = null;

        if (userDbResponse.data.length > 0) {
          userId = userDbResponse.data[0].id;
        } else {
          const userCreated = await app.service("users").create({ ...body });
          const deviceCreated = await app
            .service("device")
            .create({ ...device, deviceUser: userCreated.id });
          // if (!userCreated) {
          if (!deviceCreated) {
            const userDeletedResponse = await app
              .service("users")
              .remove(userCreated.id);
            console.log("Usuario eliminado, ", { userDeletedResponse });
            userMessageResponse = await findServiceApp(
              app,
              {
                userMessageResult: "error",
                userMessageReference: "user register with upload image",
              },
              "user-messages"
            );
            response = {
              status: 500,
              json: {
                alert:
                  userMessageResponse.data.length > 0
                    ? userMessageResponse.data[0].userMessage
                    : "No fue posible registrar el usuario",
                type: "error",
              },
            };
            return res.status(response.status).json(response.json);
          }
          console.log({ userCreated });
          userId = userCreated.id;
        }
        if (!userId) {
          console.log(
            "Error interno al intentar registrar el usuario desde images service"
          );
          userMessageResponse = await findServiceApp(
            app,
            {
              userMessageResult: "error",
              userMessageReference: "user register with upload image",
            },
            "user-messages"
          );
          response = {
            status: 500,
            json: {
              alert:
                userMessageResponse.data.length > 0
                  ? userMessageResponse.data[0].userMessage
                  : "No fue posible registrar el usuario",
              type: "error",
            },
          };
          return res.status(response.status).json(response.json);
        }

        const userImageCreated = await app.service("user-images").create({
          userFileName: fileData.fileName
            ? fileData.fileName
            : file.originalname,
          userFileDescription: fileData.fileDescription,
          userFileReference: fileData.fileReference,
          userFileState: fileData.fileState,
          // userFileUserId: userCreated.id,
          userFileUserId: userId,
          userFileUrl: imageUrl,
        });

        console.log({ userImageCreated });

        if (!userImageCreated) {
          console.log("Error al subir la imagen");
          userMessageResponse = await findServiceApp(
            app,
            {
              userMessageResult: "error image register",
              userMessageReference: "user register with upload image",
            },
            "user-messages"
          );
          response = {
            status: 500,
            json: {
              alert:
                userMessageResponse.data.length > 0
                  ? userMessageResponse.data[0].userMessage
                  : "Se el usuario se ha registrado correctamente, pero no fue posible registrar la imagen en la base de datos",
              type: "error",
            },
          };
          return res.status(response.status).json(response.json);
        }

        // if (!userImageCreated) {
        //   console.log("No fue posible registrar la imagen en la base de datos");
        //   const userMessageResponse = await findServiceApp(
        //     app,
        //     {
        //       userMessageResult: "error",
        //       userMessageReference: "register advertising Image",
        //     },
        //     "user-messages"
        //   );
        //   res
        //     .status(500)
        //     // .json({ message: "Imagen subida exitosamente", imageUrl });
        //     .json({
        //       alert:
        //         userMessageResponse.data.length > 0
        //           ? userMessageResponse.data[0].userMessage
        //           : "No fue posible registrar la imagen en la base de datos",
        //       type: "error",
        //     });
        // }

        // const userMessageResponse = await findServiceApp(
        //   app,
        //   {
        //     userMessageResult: "succes",
        //     userMessageReference: "upload advertising Image",
        //   },
        //   "user-messages"
        // );
        // if (userMessageResponse.data.length > 0) {
        //   response = {
        //     status: 200,
        //     json: {
        //       alert: userMessageResponse.data[0].userMessage,
        //       type: "succes",
        //     },
        //   };
        // } else {
        //   console.log(
        //     "No se encontraron concidencias en tabla de mensajes de usuario"
        //   );
        //   response = {
        //     status: 200,
        //     json: {
        //       alert: "Imagen subida correctamente",
        //       type: "succes",
        //     },
        //   };
        // }

        // res
        //   .status(201)
        //   // .json({ message: "Imagen subida exitosamente", imageUrl });
        //   .json({ message: "Imagen subida exitosamente" });

        res
          .status(response.status)
          // .json({ message: "Imagen subida exitosamente", imageUrl });
          .json(response.json);
      } catch (error) {
        // const userMessageResponseError = await findServiceApp(
        //   app,
        //   {
        //     userMessageResult: "error",
        //     userMessageReference: "upload error advertising Image",
        //   },
        //   "user-messages"
        // );
        // let response = {
        //   status: 500,
        //   json: {
        //     alert:
        //       userMessageResponseError.data.length > 0
        //         ? userMessageResponseError.data[0].userMessage
        //         : "Error al subir la imagen",
        //     type: "error",
        //   },
        // };
        // console.error("Error al subir la imagen:", error);
        // // res.status(500).json({ error: "Error al subir la imagen" });
        console.log({ error });
        userMessageResponse = await findServiceApp(
          app,
          {
            userMessageResult: "error",
            userMessageReference: "user register with upload image",
          },
          "user-messages"
        );
        response.json = {
          alert:
            userMessageResponse.data.length > 0
              ? userMessageResponse.data[0].userMessage
              : "No fue posible registrar el usuario",
          type: "error",
        };
        return res.status(response.status).json(response.json);
      }
    }
  );

  // Get our initialized service so that we can register hooks
  // const service = app.service('images');

  // service.hooks(hooks);
};
