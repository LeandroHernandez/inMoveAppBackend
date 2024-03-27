/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable no-async-promise-executor */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
const md5 = require("md5");
const findService = require("../../../functions/findService");
const updateService = require("../../../functions/updateService");
const createService = require("../../../functions/createService");

module.exports = function (context, data) {
  return new Promise(async function (resolve) {
    console.log("*** validateOtp ***");

    let response = {};

    try {
      const { ip, mac, device, otpType, otpCode, userPhone } = data;

      console.log({ data });

      const responseOtpCodes = await findService(
        context,
        {
          otpIp: ip,
          otpMac: mac,
          otpDevice: device,
          otpType,
          otpCode: md5(otpCode),
          otpState: "P",
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
          console.log({ userMessageResponse });
          await updateService(
            context,
            responseOtpCodes.data[0].id,
            {
              otpChecked: 1,
              otpState: "V",
            },
            "otp-codes"
            // ).then(() => console.log("Estado de otp pasado a verificado"));
          ).then(async (otpVerificatedResponse) => {
            console.log("Estado de otp pasado a verificado");
            console.log({ otpVerificatedResponse });
            // if (otpType === 2) {
            //   if (userPhone) {
            //     const userDbResponse = await findService(
            //       context,
            //       { userPhone },
            //       "users"
            //     );
            //     if (userDbResponse.data.length > 0) {
            //       await context.app
            //         .service("users")
            //         .update(userDbResponse.data[0].id, {
            //           ...userDbResponse.data[0],
            //           state: true,
            //         })
            //         .then(async () => {
            //           await createService(context, "phone-and-email-historic", {
            //             userPhone,
            //             userEmail: userDbResponse.data[0].userEmail,
            //             userId: userDbResponse.data[0].id,
            //             otpCode: responseOtpCodes.data[0].id,
            //           });
            //         });
            //     }
            //   }
            // }
            if (otpType === 2 || otpType === 4) {
              if (userPhone) {
                let userPhoneAndEmailHistoricDbResponse = null;
                if (otpType === 4) {
                  userPhoneAndEmailHistoricDbResponse = await findService(
                    context,
                    {
                      otpCode: responseOtpCodes.data[0].id,
                    },
                    "phone-and-email-historic"
                  );
                }
                const userDbResponse = await findService(
                  context,
                  userPhoneAndEmailHistoricDbResponse
                    ? { id: userPhoneAndEmailHistoricDbResponse.data[0].userId }
                    : { userPhone },
                  "users"
                );
                if (userDbResponse.data.length > 0) {
                  await context.app
                    .service("users")
                    .update(userDbResponse.data[0].id, {
                      ...userDbResponse.data[0],
                      userPhone:
                        otpType == 4
                          ? userPhoneAndEmailHistoricDbResponse.data[0]
                              .userPhone
                          : userDbResponse.data[0].userPhone,
                      userEmail:
                        otpType == 4
                          ? userPhoneAndEmailHistoricDbResponse.data[0]
                              .userEmail
                          : userDbResponse.data[0].userEmail,
                      state: true,
                    })
                    .then(async () => {
                      if (otpType === 2) {
                        await createService(
                          context,
                          "phone-and-email-historic",
                          {
                            // userPhone,
                            userPhone: userDbResponse.data[0].userPhone,
                            // userEmail: userDbResponse.data[0].userEmail,
                            userEmail: userDbResponse.data[0].userEmail,
                            userId: userDbResponse.data[0].id,
                            otpCode: responseOtpCodes.data[0].id,
                          }
                        );
                      }
                    });
                }
              }
            }
          });
          response = {
            data: {
              alert: userMessageResponse.data[0].userMessage,
              type: "success",
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
