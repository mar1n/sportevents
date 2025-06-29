import type { HttpContext } from '@adonisjs/core/http'
import { createRegisterValidator } from '#validators/auth'
import User from '#models/user'
//import mail from '@adonisjs/mail/services/main'

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

    // await mail.send((message) => {
    //   message
    //     .to('cykcykacz@gmail.com')
    //     .from('szymondawidowicz@fastmail.com')
    //     .subject('Verify your email address')
    //     .html('<h1>Hello</h1>')
    // })

    return response.status(201).json({
      message: 'We send you email, please read.',
      user: user,
    })
  }
}
