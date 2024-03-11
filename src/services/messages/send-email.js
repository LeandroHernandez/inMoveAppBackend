const nodemailer = require("nodemailer");
const nodemailerSendmail = require("./nodemailer-sendmail");
module.exports = function ({ userEmail, subject, body, filePDF }) {
  return new Promise(async function (resolve, reject) {
    console.log("*** SendEmail ***: ", userEmail);

    let resp_server = {};

    console.log(userEmail, subject, body);

    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "tls://smtp.gmail.com", //'mail.cacpebiblian.fin.ec',
        port: 587,
        secure: true, // true for 465, false for other ports */
        auth: {
          user: "infoinmoveperu@gmail.com", // testAccount.user, // generated ethereal user
          pass: "caqt ryoj ajza qcay", // testAccount.pass // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false,
        },
        socketTimeout: 43200000,
      });

      let mailOptions = {
        from: "infoinmoveperu@gmail.com",
        to: userEmail,
        subject: subject,
        text: body,
      };

      const send = await transporter.sendMail(
        mailOptions,
        function (err, data) {
          if (err) {
            console.log("Error " + err);
          } else {
            console.log("Email sent successfully");
          }
        }
      );

      console.log("*** RESP send ***", send);

      if (send.error) {
        resp_server = {
          data: send,
          error: true,
        };
      } else {
        resp_server = {
          data: send,
          error: false,
        };
      }

      // let transporter = nodemailer.createTransport({
      //   //service: 'gmail',
      //   // host: 'mail.cacpebiblian.fin.ec',
      //   // port: 465,
      //   // secure: true, // true for 465, false for other ports */
      //   host: 'infoinmoveperu@gmail.com',//'mail.cacpebiblian.fin.ec',
      //   port: 465,
      //   secure: true, // true for 465, false for other ports */
      //   /** Habilitar en configuracion de la cuenta de google Acceso de apps menos seguras*/
      //   auth: {
      //     user: 'cajaonline@caja.com.ec', // testAccount.user, // generated ethereal user
      //     pass: 'dbYj7*dJbVtNMi&' // testAccount.pass // generated ethereal password
      //   },
      //   tls: {
      //     rejectUnauthorized: false
      //   },
      //   socketTimeout: 43200000
      // });

      // let headeremail ='<table style="margin-left: auto; margin-right: auto; width: 100%;"><tbody style="text-align: center;"><tr><td style="background-color: #3e98a7;"><div style="justify-content: center;"><img height="60" src="cid:Cabecera_mail.png" /></div></td>';

      // let footeremail = '<tr><td style="background-color: #3e98a7;">&nbsp;</td></tr>';

      // let body = '<tr><td><div style="justify-content: center;"><p>'+descripcion+'</p></div></td></tr>';

      // let footeremailSpam ='<tr><td><div><div style="margin: 0 auto; ; font-size: 10px;"><p style="text-align: center;"><small><strong> AVISO LEGAL:</strong> La informaci&oacute;n transmitida, incluidos los archivos adjuntos, est&aacute; destinada &uacute;nicamente a la(s) persona(s) o entidad a la que se dirige y puede contener material confidencial y/o privilegiado. Queda prohibida cualquier revisi&oacute;n, retransmisi&oacute;n, difusi&oacute;n u otro uso, o cualquier acci&oacute;n basada en esta informaci&oacute;n por parte de personas o entidades que no sean el destinatario previsto. Para acceder a nuestra Pol&iacute;tica de Tratamiento de Datos Personales presiona aqu&iacute;, y si desea comunicarse con nosotros tenga a su disposici&oacute;n el correo:</small></p><p style="text-align: center;"><small><a href="mailto:tratamientodedatos@caja.com.ec"> tratamientodedatos@caja.com.ec</a></small></p><p style="text-align: center;"><small>COOPERATIVA ALFONSO JARAMILLO LE&Oacute;N &ndash; CAJA </small></p></div></div></td></tr></tbody></table>';

      // let message = {
      //   from: 'cajaonline@caja.com.ec', // sender address
      //   // Comma separated list of recipients
      //   to: email,
      //   // to: "jeanscarod@gmail.com",
      //   subject: "COOPERATIVA CAJA",
      //   html: headeremail + body + footeremail + footeremailSpam,

      //   list: {
      //     // List-Help: <mailto:admin@example.com?subject=help>
      //     help: 'admin@example.com?subject=help',

      //     // List-Unsubscribe: <http://example.com> (Comment)
      //     unsubscribe: [
      //       {
      //         url: 'http://example.com/unsubscribe',
      //         comment: 'A short note about this url'
      //       },
      //       'unsubscribe@example.com'
      //     ],

      //     // List-ID: "comment" <example.com>
      //     id: {
      //       url: 'mylist.example.com',
      //       comment: 'This is my awesome list'
      //     }
      //   }
      // };

      // if (filePDF !== '') {
      //   message.attachments = [
      //     {
      //       filename: filePDF + '.pdf',
      //       path: 'public/docs/comprobantes/' + filePDF + '.pdf',
      //       contentType: 'application/pdf'
      //     }/*,
      //       {
      //           filename: 'header.png',
      //           path: 'public/docs/email/header.png',
      //           cid: 'header.png'
      //       },
      //       {
      //           filename: 'footer.png',
      //           path: 'public/docs/email/footer.png',
      //           cid: 'footer.png'
      //       }*/
      //   ]
      // } else {
      //   message.attachments = [
      //     {
      //       filename: 'Cabecera_mail.png',
      //       path: 'public/docs/email/Cabecera_mail.png',
      //       cid: 'Cabecera_mail.png'
      //     },
      //     // {
      //     //   filename: 'Pie_mail.png',
      //     //   path: 'public/docs/email/Pie_mail.png',
      //     //   cid: 'Pie_mail.png'
      //     // }
      //   ]
      // }
      // // send mail with defined transport object
      // // const send = await transporter.sendMail(message);
      // const send = await nodemailerSendmail(transporter, message)

      // log(JSON.stringify(send), './src/logs/SEND_MAIL.txt');
      // if (send.error) {
      //   resp_server = {
      //     data: send,
      //     error: true
      //   }
      // } else {
      //   resp_server = {
      //     data: send,
      //     error: false
      //   }
      // }
      resolve(resp_server);
    } catch (e) {
      console.log(" error SEND_MAIL ");
      console.log(JSON.stringify(e));
      resp_server = {
        data: e,
        error: true,
      };

      resolve(resp_server);
    }
  });
};
