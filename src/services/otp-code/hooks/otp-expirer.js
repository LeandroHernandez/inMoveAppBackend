/* eslint-disable linebreak-style */
/* eslint-disable no-async-promise-executor */
/* eslint-disable quotes */
const findService = require("../../../functions/findService");
const updateService = require("../../../functions/updateService");

module.exports = function (context, otpCode, userPhone) {
  return new Promise(async function (resolve) {
    let response = {
      data: {
        type: "success",
      },
    };
    try {
      const otpLifeTime = await findService(
        context,
        { parameterName: "otpLifeTime" },
        "parameters"
      );
      console.log(
        `Esperando ${JSON.parse(
          otpLifeTime.data[0].parameterValue
        )} segundos...`
      );
      const otpCodeBd = await findService(context, { otpCode }, "otp-codes");
      console.log({ otpCodeBd, otpCodeBdData: otpCodeBd.data });
      // if (!otpCodeBd.data[0].otpChecked || otpCodeBd.data[0].state === "P") {
      if (otpCodeBd.data[0].otpState === "P") {
        console.log({ estado: otpCodeBd.data[0].otpState });
        setTimeout(async () => {
          const otpCodeBd2 = await findService(
            context,
            { otpCode },
            "otp-codes"
          );
          if (otpCodeBd2.data[0].otpState === "P") {
            const updateCode = await updateService(
              context,
              otpCodeBd.data[0].id,
              { otpChecked: 1, otpState: "C" },
              "otp-codes"
            );
            console.log({ updateCode, otpState: "Expirado" });
            if (otpCodeBd.data[0].otpType === 4) {
              const userPhoneAndEmailHistoricDbResponse = await findService(
                context,
                {
                  otpCode: otpCodeBd.data[0].id,
                },
                "phone-and-email-historic"
              );
              if (userPhoneAndEmailHistoricDbResponse.data.length > 0) {
                await context.app
                  .service("phone-and-email-historic")
                  .remove(userPhoneAndEmailHistoricDbResponse.data[0].id);
              }
            }
            if (otpCodeBd.data[0].otpType === 2) {
              const userDbResponse = await findService(
                context,
                { userPhone },
                "users"
              );
              if (userDbResponse.data.length > 0) {
                const userRoleDbResponse = await findService(
                  context,
                  { userRoleIdUser: userDbResponse.data[0].id },
                  "user-roles"
                );
                if (userRoleDbResponse.data.length > 0) {
                  await context.app
                    .service("user-roles")
                    .remove(userRoleDbResponse.data[0].id);
                }
                const userDeviceDbResponse = await findService(
                  context,
                  { deviceUser: userDbResponse.data[0].id },
                  "device"
                );
                if (userDeviceDbResponse.data.length > 0) {
                  await context.app
                    .service("device")
                    .remove(userDeviceDbResponse.data[0].id);
                }
                await context.app
                  .service("users")
                  .remove(userDbResponse.data[0].id)
                  .then((userRemoved) =>
                    console.log({
                      userRemoved,
                      reason: " El otp para el registro no fue validado ",
                    })
                  );
              }
            }
          } else {
            console.log(" El otp ya ha sido validado o caducado ");
          }
          // }, JSON.parse(otpLifeTime.data[0].parameterValue) * 60 * 1000);
        }, JSON.parse(otpLifeTime.data[0].parameterValue) * 1000);
      } else {
        response = { data: { type: "invalid" } };
      }
      resolve(response);
    } catch (e) {
      response = {
        data: {
          alert: "Ha ocurrido un error al validar el tiempo de vida del OTP",
          type: "error",
          result: e.message,
        },
      };
      resolve(response);
    }
  });
};
