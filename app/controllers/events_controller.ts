import type { HttpContext } from '@adonisjs/core/http'
import { createEventValidator } from '#validators/event'
import Events from '#models/event'
import User from '#models/user'
import Attendee from '#models/attendee'

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
  public async join({ request, auth, response }: HttpContext) {
    const eventId = request.input('eventId')
    const userEmail = auth.user?.email
    const userName = auth.user?.username

    const findUser = await User.findByOrFail('email', userEmail)
    await findUser.related('attendees').create({
      eventsId: eventId,
    })
    return response.status(201).json({
      message: `${userName} joined to event`,
    })
  }
  public async leave({ request, auth, response }: HttpContext) {
    const eventId = request.input('eventId')
    const userEmail = auth.user?.email
    const userName = auth.user?.username

    const findUser = await User.findByOrFail('email', userEmail)
    const findEvent = await Events.findByOrFail('id', eventId)
    const attendee = await Attendee.findManyBy({ eventsId: eventId, userId: findUser.id })
    await attendee[0].delete()

    return response.status(201).json({
      message: `${userName} leave ${findEvent.title} event`,
    })
  }
}
