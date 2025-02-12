import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import Events from '#models/event'

async function loginHelper(client: any) {
  const userRegister = {
    username: 'Szymon Dawidowicz',
    email: 'szymon@fastmail.com',
    password: 'qwertyuio',
  }
  await client.post('/users/register').json(userRegister)
  const userLogin = {
    email: 'szymon@fastmail.com',
    password: 'qwertyuio',
  }
  const response = await client.get('/auth/login').qs(userLogin)
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
    }
    const eventRoute = await client.post('/events').json(event).header('Cookie', cookie)
    eventRoute.assertStatus(201)
    eventRoute.assertBodyContains({
      message: 'Event created successfully',
    })

    const findEvent = await Events.findByOrFail('title', event.title)
    assert.equal(findEvent.title, event.title)
  })
  test('Create invalid Event for Login User with empty title field.', async ({ client }) => {
    const cookie = await loginHelper(client)
    const event = {
      title: '',
      description: 'My discription of event...',
    }
    const eventRoute = await client.post('/events').json(event).header('Cookie', cookie)
    eventRoute.assertStatus(422)
    eventRoute.assertBody({
      errors: [{ message: 'The title field must be defined', field: 'title', rule: 'required' }],
    })
  })
  test('Create invalid Event for Login User with empty description field.', async ({ client }) => {
    const cookie = await loginHelper(client)
    const event = {
      title: 'NBA GAME',
      description: '',
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
  test('Non augthtenticate user is not allowed to access events.', async ({ client }) => {
    const event = {
      title: 'Even Title',
      discription: 'My discription of event...',
    }
    const eventRoute = await client.post('/events').json(event)
    eventRoute.assertStatus(401)
  })
})
