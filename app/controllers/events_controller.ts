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
    const events = await Events.query().preload('users', (query) => {
      query.select(['id', 'username', 'email']).pivotColumns(['status'])
    })

    return response.status(201).json({
      message: `Events of ${user}`,
      events: events,
      currentUserId: auth.user?.id,
    })
  }
  public async userEvents({ auth, response }: HttpContext) {
    const user = auth.user!.username
    const events = await Events.query()
      .whereHas('users', (userQuery) => {
        userQuery.where('username', user)
      })
      .preload('users', (query) => {
        query.select(['id', 'username', 'email']).pivotColumns(['status'])
      })

    return response.status(201).json({
      message: `Events of ${user}`,
      events: events,
      currentUserId: auth.user?.id,
    })
  }
  public async attend({ auth, response }: HttpContext) {
    const username = auth.user!.username
    const events = await Events.query().preload('users', (query) => {
      query.select(['id', 'username', 'email']).pivotColumns(['status'])
    })

    const eventsWithAttendance = events.map((event) => {
      const attendee = event.users.find((user) => user.username === username)

      return {
        ...event.serialize(),
        isAttending: !!attendee, // true if user is in attendees list
        myStatus: attendee?.$extras?.pivot_status || null, // status from pivot
      }
    })
    return response.status(201).json({
      message: `Events of ${username}`,
      events: eventsWithAttendance,
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
  public async update({ request, response }: HttpContext) {
    const eventId = request.input('id')
    const updateData = request.all()
    const event = await Events.findByOrFail('id', eventId)
    event.merge(updateData)

    await event.save()

    return response.status(201).json({
      message: 'Event has been updated',
    })
  }
}
