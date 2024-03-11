/* eslint-disable linebreak-style */
/* eslint-disable quotes */
// Initializes the `images` service on path `/images`
const { authenticate } = require("@feathersjs/express");
const multer = require("multer");
const fs = require("node:fs");
const path = require("path");
const findServiceApp = require("../../functions/findServiceApp");

const upload = multer({ dest: "public/images/" });

function getExtension(originalname) {
  // Buscar el último punto en el string
  var puntoIndex = originalname.lastIndexOf(".");

  // Verificar si se encontró un punto y si no es el último caracter
  if (puntoIndex !== -1 && puntoIndex !== originalname.length - 1) {
    // Extraer la extensión desde el punto hasta el final del string
    var extension = originalname.slice(puntoIndex + 1);
    return extension.toLowerCase(); // Convertir a minúsculas para mayor consistencia
  } else {
    return null; // No se encontró extensión válida
  }
}

function saveImage(filePath, newPath) {
  fs.renameSync(filePath, `./public/${newPath}`);
  return newPath;
}

function delteImage(url, id) {
  console.log({ id });
  if (fs.existsSync(url)) {
    // Eliminar el archivo
    fs.unlinkSync(url);
    console.log(
      `El archivo correspondiente a la ruta: "${url}" fue eliminado correctamente.`
    );
  } else {
    console.log(`El archivo correspondiente a la ruta: "${url}" no existe.`);
  }
}

module.exports = function (app) {
  // Initialize our service with any options it requires
  // app.use('/images', new Images(options, app));

  app.post(
    "/image",
    authenticate("jwt"),
    upload.single("image"),
    async (req, res) => {
      const { file, body } = req;
      const { fileType } = body;
      console.log({ body });
      const typeBbResponse = await findServiceApp(
        app,
        { id: fileType },
        "types"
      );
      console.log({ typeBbResponse: typeBbResponse.data });
      // let imageUrl = "";
      let directory = "invalid-images";
      const fileName = body.fileName
        ? `${body.fileName}.${getExtension(file.originalname)}`
        : file.originalname;
      if (typeBbResponse.data.length > 0) {
        if (
          typeBbResponse.data[0].typeName === "Tipos de Imagenes Publicitarias"
        ) {
          // imageUrl = `images/advertising-images/${`${file.originalname}`}`;
          directory = "advertising-images";
        }
        if (
          typeBbResponse.data[0].typeName === "Tipos de Imagenes de Usuario"
        ) {
          // imageUrl = `images/vehicle-images/${`${file.originalname}`}`;
          directory = "user-images/user-profiles";
          console.log({ directory });
        }
        if (
          typeBbResponse.data[0].typeName ===
          "Tipos de Imagenes de Documentación de Usuario"
        ) {
          // imageUrl = `images/vehicle-images/${`${file.originalname}`}`;
          directory = "user-images/user-documentation";
        }
        if (
          typeBbResponse.data[0].typeName ===
          "Tipos de Imagenes de Documentación de Vehiculo"
        ) {
          // imageUrl = `images/vehicle-images/${`${file.originalname}`}`;
          directory = "vehicle-images/vehicle-documentation";
        }
        if (
          typeBbResponse.data[0].typeName === "Tipos de Imagenes de Vehiculos"
        ) {
          // imageUrl = `images/vehicle-images/${`${file.originalname}`}`;
          directory = "vehicle-images/vehicles";
        }
        if (typeBbResponse.data[0].typeName === "Tipos de Imagenes Iconos") {
          // imageUrl = `images/vehicle-images/${`${file.originalname}`}`;
          directory = "icon-images";
        }
      }
      // const imageUrl = `images/vehicle-images/${`${file.originalname}`}`;
      const imageUrl = `images/${directory}/${`${fileName}`}`;
      saveImage(file.path, imageUrl);

      try {
        let response = {

        };
        if (imageUrl && typeBbResponse.data.length > 0) {
          respImg = await app.service("images").create({
            // fileName: body.fileName ? body.fileName : file.originalname,
            fileName,
            fileDescription: body.fileDescription,
            fileReference: body.fileReference,
            fileType: body.fileType,
            userFileProfileCondition: body.userFileProfileCondition,
            state: body.state,
            fileExpirerDate: body.fileExpirerDate ? body.fileExpirerDate : null,
            fileUrl: imageUrl,
            fileUserId: body.id,
            state: true,
          });
          response = {
            status: 200,
            json: {
              alert: "Imagen subida correctamente",
              type: "succes",
              data: respImg
            },
          };
        } else {
          response = {
            status: 500,
            json: {
              alert:
                "No fue posible registrar la imagen, por favor rectifique los valores ingresados",
              type: "error",
            },
          };
          delteImage(
            path.join(
              __dirname,
              `../../../public/${imageUrl}`
              // `../../../../`
            ),
            "SIN ID"
          );
        }
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
                : "Error al subir la imagen fsdda",
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
      // const { file, body } = req;
      const { body } = req;
      let { file } = req;
      const {
        fileName,
        fileDescription,
        fileReference,
        profileCondition,
        state,
      } = body;
      const id = JSON.parse(body.id);
      const imageUrl = saveImage(
        file.path,
        `images/user-images/image-usuario-${id}-foto-perfil.${getExtension(
          file.originalname
        )}`
      );

      let userMessageResponse = null;
      let response = {
        status: 500,
        json: {
          alert: "",
          type: "",
        },
      };
      try {
        // Aquí puedes obtener la URL de la imagen guardada
        // const imageUrl = "/public/" + file.filename;

        if (!id) {
          console.log("No se ha proporcionado un ID de usuario");
          userMessageResponse = await findServiceApp(
            app,
            {
              userMessageResult: "without id error",
              userMessageReference: "upload user photo perfil",
            },
            "user-messages"
          );
          response = {
            status: 500,
            json: {
              alert:
                userMessageResponse.data.length > 0
                  ? userMessageResponse.data[0].userMessage
                  : "Error al subir la foto de perfil, No se ha proporcionado ningún ID de usuario",
              type: "error",
            },
          };
          return res.status(response.status).json(response.json);
        }

        const userDbResponse = await findServiceApp(app, { id }, "users");

        if (!userDbResponse.data.length > 0) {
          console.log("ID ingresado en proceso de upload user image invalido");
          userMessageResponse = await findServiceApp(
            app,
            {
              userMessageResult: "userId not found error",
              userMessageReference: "upload user photo perfil",
            },
            "user-messages"
          );
          response = {
            status: 500,
            json: {
              alert:
                userMessageResponse.data.length > 0
                  ? userMessageResponse.data[0].userMessage
                  : "ID invalido, el ID proporcionado no es valido ya que no coicide con ningun usuario en la base de datos",
              type: "error",
            },
          };
          delteImage(
            path.join(
              __dirname,
              `../../../public/${imageUrl}`
              // `../../../../`
            ),
            id
          );
          return res.status(response.status).json(response.json);
        }

        const userProfilesPhotosResponse = await findServiceApp(
          app,
          { userFileUserId: id, userFileProfileCondition: true },
          "user-images"
        );

        userProfilesPhotosResponse.data.forEach(
          async (userProfilesPhotoItem, i) => {
            if (imageUrl !== userProfilesPhotoItem.userFileUrl) {
              // const url = path.join(
              //   __dirname,
              //   `../../../public/${userProfilesPhotoItem.userFileUrl}`
              //   // `../../../../`
              // );
              // if (fs.existsSync(url)) {
              //   // Eliminar el archivo
              //   fs.unlinkSync(url);
              //   console.log(
              //     `El archivo correspondiente a foto de perfil de usuario ${id} fue eliminado correctamente.`
              //   );
              // } else {
              //   console.log(
              //     `El archivo correspondiente a foto de perfil de usuario ${id} no existe.`
              //   );
              // }
              delteImage(
                path.join(
                  __dirname,
                  `../../../public/${userProfilesPhotoItem.userFileUrl}`
                  // `../../../../`
                ),
                id
              );
              if (i === userProfilesPhotosResponse.data.length - 1) {
                await app
                  .service("user-images")
                  .patch(userProfilesPhotoItem.id, {
                    ...userProfilesPhotoItem,
                    userFileUrl: imageUrl,
                  });
              } else {
                await app
                  .service("user-images")
                  .remove(userProfilesPhotoItem.id);
              }
            }
          }
        );

        if (userProfilesPhotosResponse.data.length === 0) {
          const userImageCreated = await app.service("user-images").create({
            userFileName: fileName ? fileName : file.originalname,
            userFileDescription: fileDescription,
            userFileReference: fileReference,
            state: state,
            userFileProfileCondition: profileCondition
              ? profileCondition
              : false,
            // id: userCreated.id,
            userFileUserId: id,
            userFileUrl: imageUrl,
          });

          if (!userImageCreated) {
            console.log("Error al subir la imagen");
            userMessageResponse = await findServiceApp(
              app,
              {
                userMessageResult: "error",
                userMessageReference: "upload user photo perfil",
              },
              "user-messages"
            );
            response = {
              status: 500,
              json: {
                alert:
                  userMessageResponse.data.length > 0
                    ? userMessageResponse.data[0].userMessage
                    : "No fue posible registrar la imagen en la base de datos",
                type: "error",
              },
            };
            return res.status(response.status).json(response.json);
          }
        }

        userMessageResponse = await findServiceApp(
          app,
          {
            userMessageResult: "succes",
            userMessageReference: "upload user photo perfil",
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

        return (
          res
            .status(response.status)
            // .json({ message: "Imagen subida exitosamente", imageUrl });
            .json(response.json)
        );
      } catch (error) {
        console.log({ error });
        userMessageResponse = await findServiceApp(
          app,
          {
            userMessageResult: "error",
            userMessageReference: "upload user photo perfil",
          },
          "user-messages"
        );
        response.json = {
          alert:
            userMessageResponse.data.length > 0
              ? userMessageResponse.data[0].userMessage
              : "No fue posible registrar la foto de perfil",
          type: "error",
        };
        return res.status(response.status).json(response.json);
      }
    }
  );
};
