/* eslint-disable quotes */
const findService = require("../../../functions/findService");
const generateOtp = require("../../otp-code/hooks/generate-otp");

async function generateOtpFunction(context, data, device, phoneOrEmailUpdate) {
  return await generateOtp(context, {
    ...data,
    mac: device.deviceMac,
    device: device.deviceName,
    phoneOrEmailUpdate,
  });
}

module.exports = () => {
  return async (context) => {
    const { data, id } = context;
    const { userPhone, userEmail, device } = data;

    if (userPhone || userEmail) {
      let response = {};
      const userDbResponse = await findService(
        context,
        id ? { id } : { userPhone },
        "users"
      );
      if (!userDbResponse) {
        response.data = {
          alert: `No fue posible verificar el
            ${id ? "usuario" : "numero de telefono"}
            en la base de datos`,
          type: "error",
        };
        context.result = response;
        return context;
      }
      if (!userDbResponse.data.length > 0) {
        await generateOtpFunction(context, data, device, false).catch(
          (otpErrorResponse) => {
            context.result = otpErrorResponse;
            return context;
          }
        );
        context.data.state = false;
        return context;
      } else {
        const userPhoneAndEmailHistoricDbResponse = await findService(
          context,
          {
            userId: userDbResponse.data[0].id,
            $sort: { updatedAt: -1 }, // Ordenar por updatedAt en orden descendente
            $limit: 1, // Limitar el resultado a 1
          },
          "phone-and-email-historic"
        );
        const recordFound = userPhoneAndEmailHistoricDbResponse.data[0];
        if (recordFound) {
          if (
            recordFound.userPhone !== userPhone ||
            recordFound.userEmail !== userEmail
          ) {
            const otpResponse = await generateOtpFunction(
              context,
              { ...data, id },
              device,
              true
            ).catch((otpErrorResponse) => {
              context.result = otpErrorResponse;
              return context;
            });
            if ("userPhone" in data) {
              delete data.userPhone;
            }
            if ("userEmail" in data) {
              delete data.userEmail;
            }
            if (!Object.keys(data).length > 0) {
              return otpResponse;
            }
            context.data.userPhone = userDbResponse.data[0].userPhone;
            context.data.userEmail = userDbResponse.data[0].userEmail;
            return context;
          }
        }
      }
    }
  };
};
