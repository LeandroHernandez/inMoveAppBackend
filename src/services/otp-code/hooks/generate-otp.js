const findService = require('../../../functions/findService');
// const createService = require('../function-services/createService');
// const codesExpires = require("./codes-expires");
// const validateUserSession = require("../users/validateUserSession");
// const loginMessageSendProcess = require("./loginMessageSendProcess");
// const proccesValidationUserAttempsLogin = require("./procces-validation-user-attemps-login.js")
// const verificates = require("../../models/verificates.model")
// const getIpNginx = require("../function-services/get-ip-nginx.js");
// const getTemplateEmail = require('../messages/get-template-email');

module.exports = function (context, data) {

  return new Promise(async function (resolve, reject) {
    console.log('*** generateOtp ***');

    let response = {};

    try {
      const { userPhone, user, otpForPhoneNumber } = data

      let userData;
      /// *** Buscamos al usuario por numero de celular ***
      // if (otpForPhoneNumber) {
      //   userData = await findService(context, { userPhone: user }, 'users')
      // } else {
      //   userData = await findService(context, { userEmail: user }, 'users')
      // }

      // console.log('*** userData ***');

      // console.log(userData);

      const parameterValue = await findService(context, { parameterName: 'otpCodeLength' }, 'parameters')

      console.log('*** parameterValue *** ', parameterValue);

      let otpLength = (parameterValue.data.length > 0) ? parseInt(parameterValue.data[0].parameterValue) : 4

      const otpCodeGenerated = Math.floor((Math.pow(10, otpLength - 1)) + Math.random() * (Math.pow(10, otpLength - 1) * 9))

      console.log('*** otpCodeGenerated ***', otpCodeGenerated);

      response = {
        alert: "Código de seguridad solicitado correctamente",
        type: 'success',
        lengthToken: otpLength,
        otpCodeGenerated,
      }

      // const verificatesModel = verificates(context.app)

      // const { values, type, deviceData, ip, mac, generatedWithBiometrics } = data

      // const { email, password } = values

      // const auth = await validateUserSession(context, email, password)

      // if (auth.isCorrect) {

      // const { state: stateUser, id: idUserData } = auth.user

      // let flagGenerateOtp = true

      // // analizar si la sesion esta activa
      // const verificatesSesion = await verificatesModel.findAll({
      //   where: {
      //     user: idUserData,
      //     state: 1
      //   }
      // })


      //   if (flagGenerateOtp === true) {
      //     // si no hay sesion vigente
      //     let userData = []
      //     userData = await findService(context, { email }, 'users')
      //     const { vusk, id } = userData.data[0]
      //     const parametersDataUser = await findService(context, { name: 'OTP_TRY' }, 'parameters')

      //     const parameterOtpLength = await findService(context, { name: 'NUMBER_OF_CHARACTERS_TOKEN' }, 'parameters')

      //     let otpLength = (parameterOtpLength.data.length > 0) ? parseInt(parameterOtpLength.data[0].value) : 4

      //     const number = (vusk === "0704418144") ? "123456" : Math.floor((Math.pow(10, otpLength - 1)) + Math.random() * (Math.pow(10, otpLength - 1) * 9))

      //     const createCode = await createService(context, 'codes', {
      //       cedule: vusk,
      //       amount: 0,
      //       type,
      //       // *** jCarlos oct 2023: si el codigo es generado por biometria ***
      //       // *** esta verificado pues ya serealizó un registro previo     ***
      //       state: generatedWithBiometrics ? 'v' : 'p',
      //       checked: 0,
      //       rem: 0,
      //       otp: md5(number.toString()),
      //       device: deviceData,
      //       ip: getIpNginx(context.params.headers, ip),
      //       mac,
      //       define: crypt(password),
      //       numberOfAttemps: "0",
      //       // *** jCarlos oct 2023: se agrega el campo para determinar si el ***
      //       // *** codigo es generado por biometria                           ***
      //       generatedWithBiometrics,
      //     })

      //     console.log('\n=================*** CREATE CODE ***===================');
      //     console.log('*** sequence ***:', createCode.sequence);
      //     console.log('*** otp      ***:', createCode.otp);
      //     console.log('*** device   ***:', createCode.device);
      //     console.log('*** type     ***:', type);
      //     console.log('================*** #CREATE CODE ***===================\n');

      //     codesExpires(context, 300000, createCode.sequence, createCode.createdAt)

      //     console.log('\n================*** AUTH STATE USER ***====================');
      //     console.log(stateUser);
      //     console.log('===============*** #AUTH STATE USER ***====================');

      //     if (stateUser) {
      //       loginMessageSendProcess(context, vusk, urlServer, userData.data[0], number, SecuencialEmpresa, type, generatedWithBiometrics)
      //       response = {
      //         alert: "Código OTP Solicitado",
      //         type: 'success',
      //         lengthToken: otpLength
      //       }
      //     } else {
      //       console.log('\n================*** USER BLOCKED ***====================');
      //       console.log(stateUser);
      //       console.log('===============*** #USER_BLOCKED ***====================');

      //       const getTemplateNav = await getTemplateEmail("USER_BLOCKED", { ip: getIpNginx(context.params.headers, ip), mac, device: deviceData }, context);
      //       const { message_sms, message_email } = getTemplateNav;

      //       response = {
      //         result: message_email,
      //         alert: message_email,
      //         type: 'error'
      //       }
      //     }
      //   } else {
      //     var message = "Sesión activa en otro dispositivo.";

      //     if (deviceData === verificatesSesion[0].dataValues.device && mac === verificatesSesion[0].dataValues.mac) {
      //       message = "Estimado usuario, usted dejó su última sesión abierta en este dispositivo";
      //     }

      //     /**
      //      * *** Se agrega los campos [userId: idUserData,] id del usuario ***
      //      * *** y [sessionId] = id de la session activa                   ***
      //      * *** que se usan en la app para poder cerrar la sesion activa  ***
      //      */
      //     response = {
      //       result: "Sesión activa en otro dispositivo.",
      //       alert: message,
      //       type: "error",
      //       userId: idUserData,
      //       sessionId: verificatesSesion[0].dataValues.id,
      //       token: verificatesSesion[0].dataValues.token,
      //     };
      //     // response = {
      //     //               result: "Sesión activa en otro dispositivo.",
      //     //               alert:  "Sesión activa en otro dispositivo.",
      //     //               type: 'error'
      //     //           }

      //   }

      // } else {

      //   response = await proccesValidationUserAttempsLogin(context, email, deviceData, ip, mac, user)

      // }

      resolve(response)

    } catch (e) {
      // statements
      console.log(e);

      let messageErrorCatch = "Debe ser socio para acceder a los servicios virtuales. No tiene cuenta de aportaciones."

      const { config } = e;

      const { url } = config;

      if (url === `${urlServer}DevuelveInformacionDeCuentas`) {

        switch (e.response.data.mensaje) {
          case "Cliente no tiene cuentas de ahorros a la vista":
            messageErrorCatch = "Usted no dispone de una cuenta activa. Por favor acerquese a la agencia mas cercana."
            break;
          default:
            // statements_def
            break;
        }

        response = {
          data: {},
          result: messageErrorCatch,
          alert: messageErrorCatch,
          type: 'error'
        }


      } else {

        response = {
          data: {},
          result: 'Usuario o contraseña incorrectos',
          alert: "Usuario o contraseña incorrectos",
          type: 'error'
        }

      }

      reject(response)
    }
  })
}





