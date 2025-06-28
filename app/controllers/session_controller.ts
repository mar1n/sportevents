import type { HttpContext } from '@adonisjs/core/http'
import { createLoginValidator } from '#validators/auth'
import User from '#models/user'

export default class SessionController {
  async store({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    await createLoginValidator.validate({ email, password })
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return response.status(200).json({
      message: 'Valid credentials',
    })
  }
}
