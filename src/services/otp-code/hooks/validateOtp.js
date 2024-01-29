const md5 = require('md5');
const findService = require('../../../functions/findService');
const sendOtpByEmail = require('../../messages/send-email');

module.exports = function (context, data) {

  return new Promise(async function (resolve, reject) {
    console.log('*** validateOtp ***');

    let response = {};

    try {
      const { ip, mac, device, otpType, otpCode } = data

      let userData;

      const responseOtpCodes = await findService(
        context,
        {
          otpIp: ip,
          otpMac: mac,
          otpDevice: device,
          otpType,
          otpCode: md5(otpCode),
          otpState: 'P',
        },
        'otp-codes',
      );

      console.log('*** responseOtpCodes ***', responseOtpCodes);


      response = {
        data:
        {
          alert: "Código de seguridad VALIDADO correctamente",
          type: 'success',
        },
      }

      resolve(response)

    } catch (e) {
      console.log(e.message);
      response = {
        data:
        {
          alert: "Ha ocurrido un error al validar el OTP",
          type: 'error',
          result: e.message,
        },
      }

      resolve(response)
    }
  })
}





