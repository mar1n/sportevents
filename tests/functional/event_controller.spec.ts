import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import Events from '#models/event'
import Attendee from '#models/attendee'
import { ApiClient } from '@japa/api-client'
import mail from '@adonisjs/mail/services/main'
import VerifyEmail from '#tests/helpers'

async function loginHelper(
  client: ApiClient,
  userName = 'Szymon Dawidowicz',
  email = 'szymondawidowicz@fastmail.com'
) {
  const { mails } = mail.fake()
  const userRegister = {
    username: userName,
    email: email,
    password: 'qwertyuio',
  }
  await client.post('/users/register').json(userRegister)
  if (email !== 'szymondawidowicz@fastmail.com') {
    mails.assertSent(VerifyEmail, ({ message }) => {
      return message.hasTo(`${email}`) && message.hasSubject('Verify your email')
    })
  } else {
    mails.assertSent(VerifyEmail, ({ message }) => {
      return (
        message.hasTo('szymondawidowicz@fastmail.com') && message.hasSubject('Verify your email')
      )
    })
  }
  const userLogin = {
    email: email,
    password: 'qwertyuio',
  }
  const response = await client.post('/auth/login').json(userLogin)
  response.assertStatus(200)
  response.assertBodyContains({
    message: 'Valid credentials',
  })

  return response.headers()['set-cookie']
}
test.group('Events controller', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  test('Create Event for Login User', async ({ client, assert }) => {
    const cookie = await loginHelper(client)
    const event = {
      title: 'Even Title',
      description: 'My discription of event...',
      startEvent: '2025-02-15 01:00:00',
      endEvent: '2025-02-16 01:00:00',
      location: 'London',
      address: 'Queen Elizabeth Road',
    }
    const eventRoute = await client.post('/events').json(event).header('Cookie', cookie)
    eventRoute.assertStatus(201)
    eventRoute.assertBodyContains({
      message: 'Event created successfully',
    })

    const findEvent = await Events.findByOrFail('userName', 'Szymon Dawidowicz')
    assert.equal(findEvent.title, event.title)
  })
  test('Find single event', async ({ client }) => {
    const cookie = await loginHelper(client)

    const event = {
      title: 'Even Title',
      description: 'My discription of event...',
      startEvent: '2025-02-15 01:00:00',
      endEvent: '2025-02-16 01:00:00',
      location: 'London',
      address: 'Queen Elizabeth Road',
    }
    await client.post('/events').json(event).header('Cookie', cookie)
    const displayEvent = await client.get('/events/display/event/1').header('Cookie', cookie)
    displayEvent.assertStatus(200)
    displayEvent.assertBodyContains({
      message: 'Event 1 for Szymon Dawidowicz',
      event: {
        title: 'Even Title',
        description: 'My discription of event...',
        location: 'London',
        address: 'Queen Elizabeth Road',
      },
    })
  })
  test('Display Events for Login user.', async ({ client }) => {
    const cookie = await loginHelper(client)
    const event = {
      title: 'Even Title',
      description: 'My discription of event...',
      startEvent: '2025-02-15 01:00:00',
      endEvent: '2025-02-16 01:00:00',
      location: 'London',
      address: 'Queen Elizabeth Road',
    }
    await client.post('/events').json(event).header('Cookie', cookie)
    const eventDisplayRoute = await client.post('/events/display').header('Cookie', cookie)
    eventDisplayRoute.assertStatus(201)
    eventDisplayRoute.assertBodyContains({
      message: 'Events of Szymon Dawidowicz',
      events: [
        {
          title: 'Even Title',
          description: 'My discription of event...',
          location: 'London',
          address: 'Queen Elizabeth Road',
          userName: 'Szymon Dawidowicz',
        },
      ],
      currentUserId: 1,
    })
  })
  test('Join to event.', async ({ client, assert }) => {
    const cookie = await loginHelper(client)
    const event = {
      title: 'Prodigy',
      description: 'My discription of event...',
      startEvent: '2025-02-15 01:00:00',
      endEvent: '2025-02-16 01:00:00',
      location: 'London',
      address: 'Queen Elizabeth Road',
    }
    await client.post('/events').json(event).header('Cookie', cookie)
    const eventId = await Events.findByOrFail('title', event.title)
    const jointEvent = await client
      .post('/events/join')
      .json({ eventId: eventId.id })
      .header('Cookie', cookie)
    jointEvent.assertStatus(201)
    jointEvent.assertBody({
      message: 'Szymon Dawidowicz joined Prodigy event',
    })

    const attendees = await Attendee.query().preload('user').preload('event')

    const attendee = attendees[0]

    assert.equal(attendee.user.username, 'Szymon Dawidowicz')
    assert.equal(attendee.user.email, 'szymondawidowicz@fastmail.com')
    assert.equal(attendee.event.title, 'Prodigy')
  })
  test('Leave event.', async ({ client, assert }) => {
    const cookie = await loginHelper(client)
    const event = {
      title: 'Prodigy',
      description: 'My discription of event...',
      startEvent: '2025-02-15 01:00:00',
      endEvent: '2025-02-16 01:00:00',
      location: 'London',
      address: 'Queen Elizabeth Road',
    }
    await client.post('/events').json(event).header('Cookie', cookie)
    await client.post('/events/join').json({ eventId: 1 }).header('Cookie', cookie)

    const attendees = await Attendee.query().preload('user').preload('event')

    const attendee = attendees[0]

    assert.equal(attendee.user.username, 'Szymon Dawidowicz')
    assert.equal(attendee.user.email, 'szymondawidowicz@fastmail.com')
    assert.equal(attendee.event.title, 'Prodigy')

    const leaveEvent = await client
      .post('/events/leave')
      .json({ eventId: 1 })
      .header('Cookie', cookie)
    leaveEvent.assertStatus(201)
    leaveEvent.assertBody({ message: 'Szymon Dawidowicz leave Prodigy event' })
    const attendeesLeave = await Attendee.query()
      .where('user_id', 1)
      .andWhere('events_id', 1)
      .first()

    if (!attendeesLeave) {
      throw new Error('Attendee not found')
    }

    assert.equal(attendeesLeave.status, 'left')
  })
  test('Only display events belonging to user.', async ({ client }) => {
    const cookie = await loginHelper(client)
    const event = {
      title: 'Even Title',
      description: 'My discription of event...',
      startEvent: '2025-02-15 01:00:00',
      endEvent: '2025-02-16 01:00:00',
      location: 'London',
      address: 'Queen Elizabeth Road',
    }
    await client.post('/events').json(event).header('Cookie', cookie)
    await client.post('/auth/logout')

    const newCookie = await loginHelper(client, 'Alfredo', 'cykcykacz@gmail.com')
    const eventDisplayRoute = await client
      .post('/events/display/userevents')
      .header('Cookie', newCookie)
    eventDisplayRoute.assertStatus(201)
    eventDisplayRoute.assertBody({
      message: 'Events of Alfredo',
      events: [],
      currentUserId: 2,
    })
    const newEvent = {
      title: 'NBA Berlin',
      description: 'My discription of event...',
      startEvent: '2025-03-15 01:00:00',
      endEvent: '2025-03-16 01:00:00',
      location: 'Berlin',
      address: 'Queen Elizabeth Road',
    }
    await client.post('/events').json(newEvent).header('Cookie', newCookie)
    const newEventDisplayRoute = await client
      .post('/events/display/userevents')
      .header('Cookie', newCookie)
    newEventDisplayRoute.assertStatus(201)
    newEventDisplayRoute.assertBodyContains({
      message: 'Events of Alfredo',
      events: [
        {
          id: 2,
          title: 'NBA Berlin',
          description: 'My discription of event...',
          location: 'Berlin',
          address: 'Queen Elizabeth Road',
          userName: 'Alfredo',
          startEvent: '2025-03-15T01:00:00.000+00:00',
          endEvent: '2025-03-16T01:00:00.000+00:00',
          users: [{ id: 2, username: 'Alfredo', email: 'cykcykacz@gmail.com' }],
        },
      ],
      currentUserId: 2,
    })
  })
  test('Only display events attend by user', async ({ client }) => {
    const cookie = await loginHelper(client)
    const event = {
      title: 'Even Title',
      description: 'My discription of event...',
      startEvent: '2025-02-15 01:00:00',
      endEvent: '2025-02-16 01:00:00',
      location: 'London',
      address: 'Queen Elizabeth Road',
    }
    await client.post('/events').json(event).header('Cookie', cookie)
    const eventId = await Events.findByOrFail('title', event.title)
    const jointEvent = await client
      .post('/events/join')
      .json({ eventId: eventId.id })
      .header('Cookie', cookie)
    jointEvent.assertStatus(201)
    jointEvent.assertBody({
      message: 'Szymon Dawidowicz joined to event',
    })
    const eventsAttendByUser = await client.get('/events/display/attend').header('Cookie', cookie)
    eventsAttendByUser.assertStatus(201)
    eventsAttendByUser.assertBodyContains({
      message: 'Events of Szymon Dawidowicz',
      events: [
        {
          title: 'Even Title',
          description: 'My discription of event...',
          location: 'London',
          address: 'Queen Elizabeth Road',
          userName: 'Szymon Dawidowicz',
        },
      ],
    })
  })
  test('Update Event', async ({ client, assert }) => {
    const cookie = await loginHelper(client)
    const event = {
      title: 'NBA Game',
      description: 'My discription of event...',
      startEvent: '2025-02-15 01:00:00',
      endEvent: '2025-02-16 01:00:00',
      location: 'London',
      address: 'Queen Elizabeth Road',
    }
    await client.post('/events').json(event).header('Cookie', cookie)
    const eventId = await Events.findByOrFail('title', event.title)

    const updateEvent = {
      id: eventId.id,
      title: 'NBA Game Berlin',
      location: 'Berlin',
      address: 'Queen Elizabeth Road',
    }
    const update = await client.post('/events/update').json(updateEvent).header('Cookie', cookie)
    update.assertStatus(201)
    update.assertBodyContains({
      message: 'Event has been updated',
      event: { description: event.description, ...updateEvent },
    })
    const updatedEvent = await Events.findByOrFail('title', updateEvent.title)
    assert.equal(updatedEvent.title, updateEvent.title)
    assert.equal(updatedEvent.location, updateEvent.location)
  })
  test('Create invalid Event with empty title field.', async ({ client }) => {
    const cookie = await loginHelper(client)
    const event = {
      title: '',
      description: 'My discription of event...',
      startEvent: '2025-02-15 01:00:00',
      endEvent: '2025-02-16 01:00:00',
      location: 'London',
      address: 'Queen Elizabeth Road',
    }
    const eventRoute = await client.post('/events').json(event).header('Cookie', cookie)
    eventRoute.assertStatus(422)
    eventRoute.assertBody({
      errors: [{ message: 'The title field must be defined', field: 'title', rule: 'required' }],
    })
  })
  test('Create invalid Event with empty description field.', async ({ client }) => {
    const cookie = await loginHelper(client)
    const event = {
      title: 'NBA GAME',
      description: '',
      startEvent: '2025-02-15 01:00:00',
      endEvent: '2025-02-16 01:00:00',
      location: 'London',
      address: 'Queen Elizabeth Road',
    }
    const eventRoute = await client.post('/events').json(event).header('Cookie', cookie)
    eventRoute.assertStatus(422)
    eventRoute.assertBody({
      errors: [
        {
          message: 'The description field must be defined',
          field: 'description',
          rule: 'required',
        },
      ],
    })
  })
  test('Create invalid Event with startEvent date after endEvent date and vice versa.', async ({
    client,
  }) => {
    const cookie = await loginHelper(client)
    const event = {
      title: 'Even Title',
      description: 'My discription of event...',
      startEvent: '2025-02-16 01:00:00',
      endEvent: '2025-02-15 01:00:00',
      location: 'London',
      address: 'Queen Elizabeth Road',
    }
    const eventRoute = await client.post('/events').json(event).header('Cookie', cookie)
    eventRoute.assertStatus(422)
    eventRoute.assertBodyContains({
      errors: [
        {
          message: 'The startEvent field must be a date before endEvent',
        },
      ],
    })
  })
  test('Create invalid Event with empty location field.', async ({ client }) => {
    const cookie = await loginHelper(client)
    const event = {
      title: 'Even Title',
      description: 'My discription of event...',
      startEvent: '2025-02-15 01:00:00',
      endEvent: '2025-02-16 01:00:00',
      location: '',
      address: 'Queen Elizabeth Road',
    }
    const eventRoute = await client.post('/events').json(event).header('Cookie', cookie)
    eventRoute.assertStatus(422)
    eventRoute.assertBody({
      errors: [
        {
          message: 'The location field must be defined',
          field: 'location',
          rule: 'required',
        },
      ],
    })
  })
  test('Create invalid Event with empty address field.', async ({ client }) => {
    const cookie = await loginHelper(client)
    const event = {
      title: 'Even Title',
      description: 'My discription of event...',
      startEvent: '2025-02-15 01:00:00',
      endEvent: '2025-02-16 01:00:00',
      location: 'London',
      address: '',
    }
    const eventRoute = await client.post('/events').json(event).header('Cookie', cookie)
    eventRoute.assertStatus(422)
    eventRoute.assertBody({
      errors: [
        {
          message: 'The address field must be defined',
          field: 'address',
          rule: 'required',
        },
      ],
    })
  })
  test('Non augthtenticate user is not allowed to access events.', async ({ client }) => {
    const event = {
      title: 'Even Title',
      discription: 'My discription of event...',
      startEvent: '2025-02-15 01:00:00',
      endEvent: '2025-02-16 01:00:00',
      location: 'London',
      address: 'Queen Elizabeth Road',
    }
    const eventRoute = await client.post('/events').json(event)
    eventRoute.assertStatus(401)
  })
})
