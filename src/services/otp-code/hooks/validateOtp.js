const md5 = require("md5");
const findService = require("../../../functions/findService");
const sendOtpByEmail = require("../../messages/send-email");
const updateService = require("../../../functions/updateService");

module.exports = function (context, data) {
  return new Promise(async function (resolve, reject) {
    console.log("*** validateOtp ***");

    let response = {};

    try {
      const { ip, mac, device, otpType, otpCode } = data;

      let userData;

      console.log({ data });

      const responseOtpCodes = await findService(
        context,
        {
          otpIp: ip,
          otpMac: mac,
          otpDevice: device,
          otpType,
          otpCode: md5(otpCode),
          // otpState: 'P',
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
              userMessageResult: "succes",
              userMessageReference: "otp validation",
            },
            "user-messages"
          );
          await updateService(
            context,
            responseOtpCodes.data[0].id,
            {
              otpChecked: 1,
              otpState: "V",
            },
            "otp-codes"
          ).then(() => console.log("Estado de otp pasado a verificado"));
          response = {
            data: {
              alert: userMessageResponse.data[0].userMessage,
              type: "succes",
            },
          };
        }
        if (responseOtpCodes.data[0].otpState === "V") {
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
        if (responseOtpCodes.data[0].otpState === "C") {
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
