import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  public async index() {
    const user = await User.all()

    return user
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
