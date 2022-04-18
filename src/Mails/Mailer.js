const nodemail = require('nodemailer')
class Mailer {
  constructor() {
    this.transporter = nodemail.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  }

  resetPassword(options) {
    this.transporter
      .sendMail({
        subject: 'Recuperação de senha',
        from: 'oraculosystem@gmail.com',
        to: options.userEmail,
        html: `<style>
        * {
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            color: rgb(51, 51, 51);
            background-color: rgb(250, 250, 250);
        }
    
        p {
            text-align: left
        }
    
        strong{
            color: blue;
            font-weight: bold;
            font-size: 18pt;
        }
        
    </style>
    <p>Olá, tudo bem?</p>
    <p>Alguem tentou recuperar a sua senha, pois não estava lembrando dela, por acaso foi vocë mesmo?</p>
    <p>Se não for vocë, aconselho a trocar de senha, pois possivelmente você está sendo atacado</p>   
    <p>Mas se foi, pode continuar com a recuperação da senha utilizando o token <i> ${options.token} </i></p>
    <p>Abraços a distancia.</p>
    <strong>Oráculo</strong>`,
      })
      .then((info) => {
        console.log(info)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

module.exports = Mailer
