const findService = require("../../../functions/findService");
const updateService = require("../../../functions/updateService");

module.exports = function (context, otpCode) {
  return new Promise(async function (resolve, reject) {
    try {
      const otpLifeTime = await findService(
        context,
        { parameterName: "otpLifeTime" },
        "parameters"
      );

      console.log({ otpLifeTime, otpLifeTimeData: otpLifeTime.data, otpCode });
      console.log("otpCode");
      console.log(otpCode);
      console.log(
        `Esperando ${JSON.parse(otpLifeTime.data[0].parameterValue)} minutos...`
      );
      const otpCodeBd = await findService(context, { otpCode }, "otp-codes");
      console.log({ otpCodeBd, otpCodeBdData: otpCodeBd.data });
      let response = {
        data: {
          type: "success",
        },
      };
      if (!otpCodeBd.data[0].otpChecked || otpCodeBd.data[0].otpState === "P") {
        setTimeout(async () => {
          const updateCode = await updateService(
            context,
            otpCodeBd.data[0].id,
            { otpChecked: 1, otpState: "c" },
            "otp-codes"
          );
          console.log({ updateCode, state: "Expirado" });
        }, JSON.parse(otpLifeTime.data[0].parameterValue) * 60 * 1000);
      } else {
        response = { data: { type: "error" } };
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
  //       otpState: "Expirado",
  //     },
  //   };
  //   resolve(response);
  // });
};
