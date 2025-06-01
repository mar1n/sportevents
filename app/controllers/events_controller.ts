import type { HttpContext } from '@adonisjs/core/http'
import { createEventValidator } from '#validators/event'
import Events from '#models/event'

export default class EventsController {
  public async createEvent({ request, auth, response }: HttpContext) {
    const data = request.all()
    const user = auth.user
    const payload = await createEventValidator.validate({ userName: user?.username, ...data })
    await Events.create(payload)

    return response.status(201).json({
      message: 'Event created successfully',
    })
  }
  public async display({ auth, response }: HttpContext) {
    const user = auth.user?.username
    const events = await Events.findManyBy('username', user)

    return response.status(201).json({
      message: `Events of ${user}`,
      events: events,
    })
  }
}
