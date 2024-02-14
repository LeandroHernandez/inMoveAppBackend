const Twilio = require("twilio");
const config = require("../../../config/default.json");

module.exports = function ({ userPhone, subject, body }) {
  return new Promise(async function (resolve, reject) {
    try {
      const { accountSid, authToken, twilioNumber } = config.twilio;

      const twilioClient = new Twilio(accountSid, authToken);
      // console.log({ userPhone, body, twilioClient, twilioNumber });

      //DESCOMENTAR PARA HABILITAR FINCION DE ENVIO DE OTP
      // await twilioClient.messages.create({
      //   // body: `Tu código de verificación es: ${code}`,
      //   body,
      //   to: userPhone,
      //   from: twilioNumber,
      // });

      resolve();
    } catch (e) {
      console.log("Error al enviar el SMS:", e);
      reject(e);
    }
  });
};
