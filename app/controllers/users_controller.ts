import type { HttpContext } from '@adonisjs/core/http'
import { createRegisterValidator } from '#validators/auth'
import User from '#models/user'
import mail from '@adonisjs/mail/services/main'
import VerifyEmail from '#tests/helpers'

export default class UsersController {
  public async index({ request }: HttpContext) {
    const user = await User.findBy('email', request.param('username'))

    return { username: user?.username, email: user?.email }
  }
  public async register({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createRegisterValidator.validate(data)
    const userExist = await User.findBy('email', payload.email)
    if (userExist) {
      return response.status(400).send({
        errors: [
          {
            message: 'User with this email already exist',
          },
        ],
      })
    }
    const user = await User.create(payload)
    const token = await User.accessTokens.create(user)

    await mail.send(new VerifyEmail(payload, token))

    return response.status(201).json({
      message: 'We send you email, please read.',
      user: user,
    })
  }
}
