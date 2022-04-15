const { User } = require('../Model/User')
const moment = require('moment')
const crypto = require('crypto')
const Mailer = require('../Mails/Mailer')
const { hashPassword } = require('../Utils/hash')

module.exports = {
  async store(req, res) {
    try {
      const { email } = req.body
      const emailRes = String(email)
      const mail = new Mailer()
      const user = await User.findOne({ where: { email: emailRes } })
      if (!user) {
        return res
          .status(400)
          .send({ error: 'Não existe usuário para esse e-mail' })
      }
      user.token = String(crypto.randomBytes(10).toString('hex'))
      user.token_created_at = new Date()

      await user.save()

      await mail.resetPassword({ token: user.token, userEmail: user.email })
      return res
        .status(200)
        .send({ message: 'E-mail enviado', token: user.token })
    } catch (err) {
      return res.status(500).send({
        error: {
          message:
            'Algo não deu certo, certifique-se de que o e-mail está registrado',
        },
      })
    }
  },

  async update(req, res) {
    try {
      const { token, password } = req.body
      const tokenReq = String(token)
      const passwordReq = String(password)

      const user = await User.findOne({ where: { token: tokenReq } })

      if (!user) {
        return res.status(400).send({ message: 'Invalid token' })
      }
      user.token = null
      user.token_created_at = null
      user.password = await hashPassword(passwordReq)

      await user.save()

      return res.status(200).send({ message: 'Senha atualizada com sucesso' })
    } catch (err) {
      return res
        .status(500)
        .send({ error: { message: 'Algo deu errado ao recuperar sua senha' } })
    }
  },
}
