import type { HttpContext } from '@adonisjs/core/http'

export default class AccountController {
  public async show({ response, auth }: HttpContext) {
    const user = auth.user
    return response.status(200).json({
      message: 'User Account',
      user: user,
    })
  }
}
