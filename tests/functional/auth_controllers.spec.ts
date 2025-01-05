import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'

test.group('Auth Controller', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  test('Register user', async ({ client, assert }) => {
    const user = {
      username: 'Szymon Dawidowicz',
      email: 'szymon@fastmail.com',
      password: 'qwertyuio',
    }

    const response = await client.post('/users/register').json(user)
    response.assertStatus(201)
    const findUser = await User.findByOrFail('username', 'Szymon Dawidowicz')
    assert.equal(findUser.username, user.username)
  })
  test('Correct email address', async ({ client }) => {
    const user = {
      username: 'Szymon Dawidowicz',
      email: 'szymonfastmail.com',
      password: '99996f666',
    }

    const response = await client.post('/users/register').json(user)
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [{ message: 'The email field must be a valid email address' }],
    })
  })
  test('Login in authenticated user', async ({ client }) => {
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
  })
})
