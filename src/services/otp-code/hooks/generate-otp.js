const md5 = require("md5");
const createService = require("../../../functions/createService");
const findService = require("../../../functions/findService");
const sendOtpByEmail = require("../../messages/send-email");
const sendOtpBySms = require("../../messages/send-sms");
const otpExpirer = require("./otp-expirer");

module.exports = function (context, data) {
  return new Promise(async function (resolve, reject) {
    // console.log("*** generateOtp ***");
    // console.log("*** data ***", data);
    let response = {};

    try {
      const { ip, mac, device, userPhone, user, userEmail, otpForPhoneNumber } =
        data;

      const usersDb = await findService(
        context,
        { userPhone: userPhone },
        "users"
      );
      // console.log({ usersDb, usersDbData: usersDb.data });
      let userData;
      let otpType;
      let otpTypeId;

      if (usersDb.data.length > 0) {
        // console.log({ condition: true, ip, mac });
        const devicesDb = await findService(
          context,
          { deviceName: device, deviceMac: mac },
          "device"
        );
        if (
          devicesDb.data.length > 0 &&
          devicesDb.data[0].deviceUser === usersDb.data[0].id
        ) {
          otpType = 1;
        } else {
          otpType = 3;
        }
      } else {
        otpType = 2;
      }
      console.log({ otpType });
      await findService(
        context,
        { otpType: JSON.stringify(otpType) },
        "otp-types"
      )
        .then((res) => {
          otpTypeId = res.data[0].id;
        })
        .catch((error) => console.log({ error }));

      if (!otpTypeId) {
        const response = {
          data: {
            alert: "Ha ocurrido un error al validar el tipo de OTP",
            type: "error",
            result: "No se encontraron valores en la tabla de tipos de OTP",
          },
        };
        resolve(response);
      }
      const parameterValue = await findService(
        context,
        { parameterName: "otpCodeLength" },
        "parameters"
      );

      // console.log("*** parameterValue *** ", parameterValue);

      let otpLength =
        parameterValue.data.length > 0
          ? parseInt(parameterValue.data[0].parameterValue)
          : 4;

      const otpCodeGenerated = Math.floor(
        Math.pow(10, otpLength - 1) +
          Math.random() * (Math.pow(10, otpLength - 1) * 9)
      );
      const otpCode = md5(otpCodeGenerated.toString());
      // console.log({ otpTypeId });
      const responseCreateCode = await createService(context, "otp-codes", {
        otpIp: ip,
        otpMac: mac,
        otpDevice: device,
        // otpCode: md5(otpCodeGenerated.toString()),
        otpCode,
        otpType: otpTypeId,
        otpState: "P",
        otpChecked: 0,
        otpNumberOfAttempts: "0",
      })
        .then(async (resp) => {
          // console.log("*** otpCodeGenerated ***", otpCodeGenerated);
          /// *** Buscamos al usuario por numero de celular ***
          if (otpForPhoneNumber) {
            // console.log("*** Enviar otp por SMS ***");
            // const smsBody = `Estimado usuario, InMove le informa que su código de seguridad es: ${otpCodeGenerated}`;
            // await sendOtpBySms({
            //   userPhone,
            //   subject: "Código de seguridad",
            //   body: smsBody,
            // });
          } else {
            // console.log("*** Enviar otp por correo ***");
            const emailBody = `Estimado usuario, InMove le informa que su código de seguridad es: ${otpCodeGenerated}`;
            await sendOtpByEmail({
              userEmail,
              subject: "Código de seguridad",
              body: emailBody,
            });
          }
          //Proceso para controlar tiempo de vida del otp --setTime()
          // const response = {
          //   data: {
          //     alert: "Código de seguridad solicitado correctamente",
          //     type: "success",
          //     lengthToken: otpLength,
          //     otpCodeGenerated,
          //     otpType,
          //   },
          // };

          // // console.log({ response });

          // resolve(response);
        })
        .catch((error) => {
          // // console.log('*** error ***', error.code);
          // response = {
          //   data:
          //   {
          //     alert: "Ha ocurrido un error",
          //     type: 'error',
          //     message: `${error.code}: ${error.message}`
          //   },
          // }
          // // console.log(response);
          // resolve(response);
        });
      //Proceso para controlar tiempo de vida del otp --setTime()
      console.log({ otpCodeGenerated, otpCode });
      let response = {
        data: {
          alert: "Código de seguridad solicitado correctamente",
          type: "success",
          lengthToken: otpLength,
          // otpCodeGenerated,
          otpType,
        },
      };
      await otpExpirer(context, otpCode)
        .then((res) => {
          console.log({ res });
          res.data.type === "error"
            ? (response = { data: { alert: "Código invalido", type: "error" } })
            : false;
        })
        .catch((error) => console.log({ error }));
      console.log({ response });
      resolve(response);
    } catch (e) {
      // console.log(e.message);
      response = {
        data: {
          alert: "Ha ocurrido un error al generar el OTP",
          type: "error",
          result: e.message,
        },
      };
      resolve(response);
    }
  });
};

/**
 *
 * @param {*} data
 */
async function saveOtp({ data }) {
  // console.log("*** saveOtp ***", data);
}
