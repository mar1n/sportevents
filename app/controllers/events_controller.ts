import type { HttpContext } from '@adonisjs/core/http'
import { createEventValidator } from '#validators/event'
import Events from '#models/event'
import Attendee from '#models/attendee'

export default class EventsController {
  public async createEvent({ request, auth, response }: HttpContext) {
    const data = request.all()
    const user = auth.user
    const payload = await createEventValidator.validate({ userName: user?.username, ...data })
    const event = await Events.create(payload)

    await event.related('users').attach({
      [user!.id]: {
        status: 'creator',
      },
    })
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
  public async displayEvent({ params, auth, response }: HttpContext) {
    const userId = auth.user!.id
    const eventId = params.id

    const event = await Events.query()
      .where('id', eventId)
      .whereHas('users', (userQuery) => {
        userQuery.wherePivot('user_id', userId)
      })
      .preload('users', (query) => {
        query.select(['id', 'username', 'email']).pivotColumns(['status'])
      })
      .first()

    return response.status(200).json({
      message: `Event ${event?.id} for ${auth.user!.username}`,
      event,
    })
  }
  public async userEvents({ auth, response }: HttpContext) {
    const user = auth.user!.username
    const userId = auth.user!.id

    const events = await Events.query()
      .whereHas('users', (userQuery) => {
        userQuery.wherePivot('user_id', userId)
      })
      .preload('users', (query) => {
        query.select(['id', 'username', 'email']).pivotColumns(['status'])
      })

    return response.status(201).json({
      message: `Events of ${user}`,
      events: events,
      currentUserId: userId,
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
        isAttending: !!attendee,
        myStatus: attendee?.$extras?.pivot_status || null,
      }
    })
    return response.status(201).json({
      message: `Events of ${username}`,
      events: eventsWithAttendance,
    })
  }
  public async join({ request, auth, response }: HttpContext) {
    const eventId = request.input('eventId')
    const userName = auth.user?.username

    const findEvent = await Events.findByOrFail('id', eventId)
    await Attendee.firstOrCreate({ userId: auth.user?.id, eventsId: eventId }, { status: 'going' })

    return response.status(201).json({
      message: `${userName} joined ${findEvent.title} event`,
    })
  }
  public async leave({ request, auth, response }: HttpContext) {
    const eventId = request.input('eventId')
    const userName = auth.user?.username

    const findEvent = await Events.findByOrFail('id', eventId)
    await Attendee.updateOrCreate({ userId: auth.user?.id, eventsId: eventId }, { status: 'left' })

    return response.status(201).json({
      message: `${userName} leave ${findEvent.title} event`,
    })
  }
  public async update({ request, auth, response }: HttpContext) {
    const userId = auth.user!.id
    const eventId = request.input('id')

    const event = await Events.query()
      .where('id', eventId)
      .whereHas('users', (userQuery) => {
        userQuery.wherePivot('user_id', userId)
      })
      .first()

    const updateData = request.only([
      'title',
      'description',
      'location',
      'address',
      'staerEvent',
      'endEvent',
    ])

    event?.merge(updateData)
    await event?.save()

    return response.status(201).json({
      message: 'Event has been updated',
      event: event,
    })
  }
}
