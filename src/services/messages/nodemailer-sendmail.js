const nodemailer = require("nodemailer");
module.exports = function (transporter, mailOptions) {
  return new Promise(async function (resolve, reject) {
    let resp_server = {};

    try {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("ERROR ENVIO DE CORREO " + error);
          resolve({ error }); // or use rejcet(false) but then you will have to handle errors
        } else {
          console.log(
            "\n=================*** EMAIL succesFULLY SENT ***==================="
          );
          console.log(info.response);
          console.log(
            "================*** #EMAIL succesFULLY SENT ***===================\n"
          );
          resolve({ info });
        }
      });
    } catch (e) {
      console.log(" error NODE_MAILER_SEND_MAIL ", e);
      log(JSON.stringify({ error: e }), "./src/logs/NODE_MAILER_SEND_MAIL.txt");
      resp_server = {
        data: e,
        error: true,
      };

      reject(resp_server);
    }
  });
};
