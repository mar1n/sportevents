import type { HttpContext } from '@adonisjs/core/http'
import { createPostValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  public async register({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createPostValidator.validate(data)
    const user = await User.create(payload)

    return response.status(201).json({
      message: 'User registered successfully',
      user: user,
    })
  }
}
