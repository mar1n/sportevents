import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import { ApiClient } from '@japa/api-client'

async function register(client: ApiClient, email = 'szymon@fastmail.com') {
  const user = {
    username: 'Szymon Dawidowicz',
    email: email,
    password: 'qwertyuio',
  }

  const response = await client.post('/users/register').json(user)
  return response
}
test.group('Users Controller', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  test('Get users.', async ({ client }) => {
    const user = new User()
    user.username = 'Szymon'
    user.email = 'cykcykacz@gmail.com'
    user.password = '666'
    await user.save()
    const response = await client.get(`/users/cykcykacz@gmail.com`)
    response.assertStatus(200)
    response.assertBody({
      username: 'Szymon',
      email: 'cykcykacz@gmail.com',
    })
  })
  test('Register user.', async ({ client, assert }) => {
    const response = await register(client)
    response.assertStatus(201)
    const findUser = await User.findByOrFail('username', 'Szymon Dawidowicz')
    assert.equal(findUser.username, 'Szymon Dawidowicz')
  })
  test('Invalid email address.', async ({ client }) => {
    const response = await register(client, 'szymonfastmail.com')
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [{ message: 'The email field must be a valid email address' }],
    })
  })
  test('Login in authenticated user and logout.', async ({ client }) => {
    await register(client)
    const userLogin = {
      email: 'szymon@fastmail.com',
      password: 'qwertyuio',
    }
    const response = await client.get('/auth/login').qs(userLogin)
    response.assertStatus(200)
    response.assertBodyContains({
      message: 'Valid credentials',
    })

    const cookies = response.headers()['set-cookie']

    const protectedRoute = await client.get('/account').header('Cookie', cookies)
    protectedRoute.assertStatus(200)

    await client.post('/auth/logout').header('Cookie', cookies)

    const protectedRouteNewRequest = await client.get('/account')
    protectedRouteNewRequest.assertStatus(401)
  })
  test('Non augthtenticate user cannot access protected resource.', async ({ client }) => {
    const protectedRoute = await client.get('/account')
    protectedRoute.assertStatus(401)
  })

  test('Invalid credentials.', async ({ client }) => {
    await register(client)
    const userLogin = {
      email: 'szymo@fastmail.com',
      password: 'qwertyuio',
    }
    const response = await client.get('/auth/login').qs(userLogin)
    response.assertStatus(400)
    response.assertBodyContains({
      errors: [{ message: 'Invalid user credentials' }],
    })
  })
})
