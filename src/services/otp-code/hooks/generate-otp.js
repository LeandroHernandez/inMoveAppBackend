const md5 = require('md5');
const createService = require('../../../functions/createService');
const findService = require('../../../functions/findService');
const sendOtpByEmail = require('../../messages/send-email');

module.exports = function (context, data) {

  return new Promise(async function (resolve, reject) {
    console.log('*** generateOtp ***');
    console.log('*** data ***', data);
    let response = {};

    try {
      const { ip, mac, device, otpType, userPhone, user, userEmail, userPhoneNumber, otpForPhoneNumber } = data

      let userData;

      const parameterValue = await findService(context, { parameterName: 'otpCodeLength' }, 'parameters')

      console.log('*** parameterValue *** ', parameterValue);

      let otpLength = (parameterValue.data.length > 0) ? parseInt(parameterValue.data[0].parameterValue) : 4

      const otpCodeGenerated = Math.floor((Math.pow(10, otpLength - 1)) + Math.random() * (Math.pow(10, otpLength - 1) * 9))

      const responseCreateCode = await createService(context, 'otp-codes', {
        otpIp: ip,
        otpMac: mac,
        otpDevice: device,
        otpCode: md5(otpCodeGenerated.toString()),
        otpType: otpType,
        otpState: 'P',
        otpChecked: 0,
        otpNumberOfAttempts: '0'
      }).then(async (resp) => {
        console.log('*** otpCodeGenerated ***', otpCodeGenerated);
        /// *** Buscamos al usuario por numero de celular ***
        if (otpForPhoneNumber) {
          console.log('*** Enviar otp por SMS ***');
        } else {
          console.log('*** Enviar otp por correo ***');
          const emailBody = `Estimado usuario, InMove le informa que su código de seguridad es: ${otpCodeGenerated}`;
          await sendOtpByEmail({ userEmail, subject: 'Código de seguridad', body: emailBody });
        }

        response = {
          data:
          {
            alert: "Código de seguridad solicitado correctamente",
            type: 'success',
            lengthToken: otpLength,
            otpCodeGenerated,
          },
        }

        resolve(response)
      }).catch((error) => {
        console.log('*** error ***', error.code);
        response = {
          data:
          {
            alert: "Ha ocurrido un error",
            type: 'error',
            message: `${error.code}: ${error.message}`
          },
        }
        console.log(response);
        resolve(response);
      })
    } catch (e) {
      console.log(e.message);
      response = {
        data:
        {
          alert: "Ha ocurrido un error al generar el OTP",
          type: 'error',
          result: e.message,
        },
      }
      resolve(response)
    }
  })
}

/**
 *
 * @param {*} data
 */
async function saveOtp({ data }) {
  console.log('*** saveOtp ***', data);

}





