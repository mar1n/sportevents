import type { HttpContext } from '@adonisjs/core/http'

export default class AccountController {
  public async show({ response }: HttpContext) {
    return response.status(200)
  }
}
