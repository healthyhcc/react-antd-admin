const nodemailer = require("nodemailer");
const CryptoJS = require("crypto-js");
const { emailConfig } = require("./config");

const generateEmailCode = (emailString) => {
  return new Promise((resolve, reject) => {
    const proxyEmail = emailConfig.neteaseConfig;
    const randomCode = Math.floor(Math.random() * 900000) + 100000;
    const emailCode = CryptoJS.AES.encrypt(
      randomCode.toString(),
      emailConfig.secretKey
    ).toString();
    const htmlString = `<html>
          <head>
              <title>验证码</title>
              <meta charset="UTF-8">
          </head>
          <style type="text/css">
              #container {
                  position: relative;
                  width: 100%;
                  height: 100%;
              }
              .content {
                  position: relative;
                  height: 300px;
                  font-weight: bolder;
              }
          </style>
          <body>
              <div id="container">
                <div class="content">您的验证码为：${randomCode}, 请妥善保管。</div>
              </div>
          </body>
      </html>`;
    const addressee = {
      from: `"healthyhcc"<${proxyEmail.auth.user}>`,
      to: `<${emailString}>`,
      subject: "验证码",
      text: "😊😊😊",
      html: htmlString,
      attachments: [
        // {
        //   filename: "avatar.jpg",
        //   path: "../server/static/avatar.jpg",
        // },
        {
          filename: "avatar.jpg",
          path: "../server/static/1.webp",
        },
        {
          filename: "avatar.jpg",
          path: "../server/static/2.webp",
        },
        {
          filename: "avatar.jpg",
          path: "../server/static/3.webp",
        },
        {
          filename: "avatar.jpg",
          path: "../server/static/4.jpg",
        },
        {
          filename: "avatar.jpg",
          path: "../server/static/5.webp",
        },
        {
          filename: "avatar.jpg",
          path: "../server/static/6.webp",
        },
      ],
    };

    const transporter = nodemailer.createTransport(proxyEmail);
    transporter.sendMail(addressee, (error) => {
      if (error) {
        reject(error);
      }
      transporter.close();
    });
    resolve(emailCode);
  });
};

module.exports = generateEmailCode;
