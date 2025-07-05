import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import { ApiClient } from '@japa/api-client'
import mail from '@adonisjs/mail/services/main'
import VerifyEmail from '#tests/helpers'

async function register(
  client: ApiClient,
  username: string | undefined = 'Szymon Dawidowicz',
  email: string | undefined = 'szymon@fastmail.com',
  password: string | undefined = 'qwertyuio'
) {
  const { mails } = mail.fake()
  const user = {
    username,
    email,
    password,
  }

  const response = await client.post('/users/register').json(user)
  mails.assertSent(VerifyEmail, ({ message }) => {
    return message.hasTo('szymon@fastmail.com') && message.hasSubject('Verify your email')
  })
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
  test('User name is empty.', async ({ client }) => {
    const response = await register(client, '')
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [{ message: 'The username field must be defined' }],
    })
  })
  test('Email is empty.', async ({ client }) => {
    const response = await register(client, 'Szymon Dawidowicz', '')
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [{ message: 'The email field must be defined' }],
    })
  })
  test('Password is empty.', async ({ client }) => {
    const response = await register(client, 'Szymon Dawidowicz', 'szymon@fastmail.com', '')
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [{ message: 'The password field must be defined' }],
    })
  })
  test('The password field must have at least 8 characters.', async ({ client }) => {
    const response = await register(client, 'Szymon Dawidowicz', 'szymon@fastmail.com', 'asd')
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [{ message: 'The password field must have at least 8 characters' }],
    })
  })
  test('Invalid email address.', async ({ client }) => {
    const response = await register(client, 'Szymon Dawidowicz', 'szymonfastmail.com')
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
    const response = await client.post('/auth/login').json(userLogin)
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

  test('Login Empty fields.', async ({ client }) => {
    await register(client)
    const userLogin = {
      email: '',
      password: '',
    }
    const response = await client.post('/auth/login').json(userLogin)
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        { message: 'The email field must be defined' },
        { message: 'The password field must be defined' },
      ],
    })
  })
  test('Invalid credentials.', async ({ client }) => {
    await register(client)
    const userLogin = {
      email: 'szymo@fastmail.com',
      password: 'qwertyuio',
    }
    const response = await client.post('/auth/login').json(userLogin)
    response.assertStatus(400)
    response.assertBodyContains({
      errors: [{ message: 'Invalid user credentials' }],
    })
  })
  test('Email already exist in database.', async ({ client }) => {
    await register(client)
    const user = {
      username: 'random',
      email: 'szymon@fastmail.com',
      password: 'qwertyuio',
    }
    const response = await client.post('/users/register').json(user)
    response.assertStatus(400)
    response.assertBodyContains({
      errors: [{ message: 'User with this email already exist' }],
    })
  })
})
