/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
const Twilio = require("twilio");
const config = require("../../../config/default.json");

module.exports = function ({ smsPhoneNumber, subject, body }) {
  return new Promise(async function (resolve, reject) {
    try {
      const { accountSid, authToken, twilioNumber } = config.twilio;

      const twilioClient = new Twilio(accountSid, authToken);
      console.log({ smsPhoneNumber, body, twilioClient, twilioNumber });

      await twilioClient.messages.create({
        body,
        to: smsPhoneNumber,
        from: twilioNumber,
      });

      resolve();
    } catch (e) {
      console.log("Error al enviar el SMS:", e);
      reject(e);
    }
  });
};
