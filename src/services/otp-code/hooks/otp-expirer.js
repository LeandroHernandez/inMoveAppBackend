/* eslint-disable no-async-promise-executor */
/* eslint-disable quotes */
const findService = require("../../../functions/findService");
const updateService = require("../../../functions/updateService");

module.exports = function (context, otpCode) {
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
      if (otpCodeBd.data[0].state === "P") {
        console.log({ estado: otpCodeBd.data[0].state });
        setTimeout(async () => {
          const otpCodeBd2 = await findService(
            context,
            { otpCode },
            "otp-codes"
          );
          if (otpCodeBd2.data[0].state === "P") {
            const updateCode = await updateService(
              context,
              otpCodeBd.data[0].id,
              { otpChecked: 1, state: "C" },
              "otp-codes"
            );
            console.log({ updateCode, state: "Expirado" });
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
  // console.log('*** context *** ', context);
  // console.log('*** service *** ', service);
  // console.log('*** data *** ', data);
  // const otpLifeTime = await findService(
  //   context,
  //   { parameterName: "otpLifeTime" },
  //   "parameters"
  // );

  // console.log(
  //   `Esperando ${JSON.parse(otpLifeTime.data[0].otpLifeTime)} minutos...`
  // );

  // // return setTimeout(() => {
  // //   console.log("Expirado");
  // // }, JSON.parse(otpLifeTime.data[0].otpLifeTime) * 60 * 1000);

  // return new Promise(function (resolve, reject) {
  //   setTimeout(() => {
  //     console.log("Expirado");
  //   }, JSON.parse(otpLifeTime.data[0].otpLifeTime) * 60 * 1000);
  //   const response = {
  //     data: {
  //       state: "Expirado",
  //     },
  //   };
  //   resolve(response);
  // });
};
