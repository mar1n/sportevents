import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import Events from '#models/event'
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
    })
  })
  test('Only display events belonging to user.', async ({ client }) => {
    // setting up events for first user
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

    // setting up events for second user
    const newCookie = await loginHelper(client, 'Alfredo', 'cykcykacz@gmail.com')
    const eventDisplayRoute = await client.post('/events/display').header('Cookie', newCookie)
    eventDisplayRoute.assertStatus(201)
    eventDisplayRoute.assertBodyContains({
      message: 'Events of Alfredo',
      events: [],
    })
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
