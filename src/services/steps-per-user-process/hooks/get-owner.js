/* eslint-disable quotes */
// const generateOtp = require("./generate-otp");
// const validateOtp = require("./validateOtp");

module.exports = () => {
  return async (context) => {
    const { data } = context;

    console.log({ context, data });
    // let response = {};

    // // console.log('*** generateOtpCode ***');
    // // console.log(data);

    // const { otpOption } = data;

    // // console.log('*** otpOption ***', otpOption);

    // if (otpOption === "create") {
    //   const resp = await generateOtp(context, data);
    //   response = resp;
    // } else if (otpOption === "validate") {
    //   const resp = await validateOtp(context, data);
    //   response = resp;
    // } else {
    //   response = {
    //     data: {
    //       result:
    //         "Ha ocurrido un error al generar el código (otpOption no valido)",
    //       alert:
    //         "Ha ocurrido un error al generar el código (otpOption no valido)",
    //       message:
    //         "Ha ocurrido un error al generar el código (otpOption no valido)",
    //       type: "error",
    //     },
    //   };
    // }

    // context.result = response;
  };
};
