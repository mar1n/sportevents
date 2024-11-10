import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

export default class AuthController {
  public async register({ request, response }: HttpContext) {
    const data = request.only(['username', 'email', 'password'])

    // Create and save the user
    const user = await User.create(data)

    return response.status(201).json({
      message: 'User registered successfully',
      user: user,
    })
  }
}
