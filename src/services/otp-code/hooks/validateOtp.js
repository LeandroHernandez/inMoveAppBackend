/* eslint-disable linebreak-style */
/* eslint-disable no-async-promise-executor */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const md5 = require("md5");
const findService = require("../../../functions/findService");
const updateService = require("../../../functions/updateService");

module.exports = function (context, data) {
  return new Promise(async function (resolve) {
    console.log("*** validateOtp ***");

    let response = {};

    try {
      const { ip, mac, device, otpType, otpCode } = data;

      console.log({ data });

      const responseOtpCodes = await findService(
        context,
        {
          otpIp: ip,
          otpMac: mac,
          otpDevice: device,
          otpType,
          otpCode: md5(otpCode),
          // state: 'P',
        },
        "otp-codes"
      );

      console.log("*** responseOtpCodes ***", responseOtpCodes);

      let response;

      // let userMessageResponse;
      let userMessageResponse;
      if (responseOtpCodes.data.length > 0) {
        console.log("data");
        if (responseOtpCodes.data[0].otpState === "P") {
          console.log("P");
          userMessageResponse = await findService(
            context,
            {
              userMessageResult: "success",
              userMessageReference: "otp validation",
            },
            "user-messages"
          );
          await updateService(
            context,
            responseOtpCodes.data[0].id,
            {
              otpChecked: 1,
              state: true,
            },
            "otp-codes"
          ).then(() => console.log("Estado de otp pasado a verificado"));
          response = {
            data: {
              alert: userMessageResponse.data[0].userMessage,
              type: "success",
            },
          };
        }
        if (responseOtpCodes.data[0].state === true) {
          console.log("V");
          userMessageResponse = await findService(
            context,
            {
              userMessageResult: "validated",
              userMessageReference: "otp validation",
            },
            "user-messages"
          );
          response = {
            data: {
              alert: userMessageResponse.data[0].userMessage,
              type: "error",
            },
          };
        }
        if (responseOtpCodes.data[0].state === "C") {
          console.log("C");
          userMessageResponse = await findService(
            context,
            {
              userMessageResult: "expired",
              userMessageReference: "otp validation",
            },
            "user-messages"
          );
          response = {
            data: {
              alert: userMessageResponse.data[0].userMessage,
              type: "error",
            },
          };
        }
      } else {
        userMessageResponse = await findService(
          context,
          {
            userMessageResult: "empty",
            userMessageReference: "otp validation",
          },
          "user-messages"
        );
        if (userMessageResponse.data.lenght > 0) {
          response = {
            data: {
              alert: userMessageResponse.data[0].userMessage,
              type: "error",
            },
          };
        } else {
          response = {
            data: {
              alert: "Estimado usario, el codigo ingresado es invalido",
              type: "error",
            },
          };
        }
      }

      resolve(response);
    } catch (e) {
      console.log(e.message);
      response = {
        data: {
          alert: "Ha ocurrido un error al validar el OTP",
          type: "error",
          result: e.message,
        },
      };

      resolve(response);
    }
  });
};
