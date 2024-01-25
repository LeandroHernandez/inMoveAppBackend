const findService = require('../../../functions/findService');
const sendOtpByEmail = require('../../messages/send-email');

module.exports = function (context, data) {

  return new Promise(async function (resolve, reject) {
    console.log('*** generateOtp ***');

    let response = {};

    try {
      const { userPhone, user, userEmail, userPhoneNumber, otpForPhoneNumber } = data

      let userData;

      const parameterValue = await findService(context, { parameterName: 'otpCodeLength' }, 'parameters')

      console.log('*** parameterValue *** ', parameterValue);

      let otpLength = (parameterValue.data.length > 0) ? parseInt(parameterValue.data[0].parameterValue) : 4

      const otpCodeGenerated = Math.floor((Math.pow(10, otpLength - 1)) + Math.random() * (Math.pow(10, otpLength - 1) * 9))

      console.log('*** otpCodeGenerated ***', otpCodeGenerated);
      /// *** Buscamos al usuario por numero de celular ***
      if (otpForPhoneNumber) {
        console.log('*** Enviar otp por SMS ***');
      } else {
        console.log('*** Enviar otp por correo ***');
        await sendOtpByEmail({userEmail, subject: 'subject', description: 'description'});
      }

      response = {
        alert: "Código de seguridad solicitado correctamente",
        type: 'success',
        lengthToken: otpLength,
        otpCodeGenerated,
      }

      resolve(response)

    } catch (e) {
      console.log(e.message);
      response = {
        data: {},
        result: e.message,
        alert: "Ha ocurrido un error al generar el OTP",
        type: 'error'
      }

      resolve(response)
    }
  })
}





