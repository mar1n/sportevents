import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  public async index({ request }: HttpContext) {
    const user = await User.findBy('email', request.param('username'))

    return { username: user?.username, email: user?.email }
  }
  public async store({ request }: HttpContext) {
    const user = new User()
    user.username = request.body().username
    user.email = request.body().email
    user.password = request.body().password
    await user.save()
    return {
      message: 'user created',
    }
  }
}
