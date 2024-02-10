const findService = require("../../../functions/findService");
// const fs = require("fs");
const fs = require("node:fs");
const path = require("path");

module.exports = () => {
  return async (context) => {
    // const { data } = context;
    const { params, app } = context;
    const id = JSON.parse(context.id);
    // let response = {};

    // console.log({ params, id, typeId: typeof id, idParse: JSON.parse(id) });
    const userDb = await findService(context, { id }, "users");
    console.log({ userDb });

    if (userDb.data.length > 0) {
      const userImagesDb = await findService(
        context,
        { userFileUserId: id },
        "user-images"
      );

      userImagesDb.data.forEach(async (userImageDbItem) => {
        await app.service("user-images").remove(userImageDbItem.id);
      });

      const userDevicesDb = await findService(
        context,
        { deviceUser: id },
        "device"
      );

      userDevicesDb.data.forEach(async (userDeviceDbItem) => {
        console.log({ userDeviceDbItem });

        await app.service("device").remove(userDeviceDbItem.id);
      });
      return context;
    } else {
      const userMessageResponse = await findService(
        context,
        {
          userMessageResult: "id not found error",
          userMessageReference: "user delete",
        },
        "user-messages"
      );
      context.result = {
        alert: userMessageResponse.data[0].userMessage
          ? userMessageResponse.data[0].userMessage
          : "Estimado usuario el ID ingresado es invalido, el ID ingresado no corresponde a ningun usuario en la base de datos",
        type: "error",
      };
    }

    return context;
  };
};
