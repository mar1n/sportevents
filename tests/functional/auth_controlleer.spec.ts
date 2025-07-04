import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { ApiClient } from '@japa/api-client'

async function register(
  client: ApiClient,
  username: string | undefined = 'Szymon Dawidowicz',
  email: string | undefined = 'szymon@fastmail.com',
  password: string | undefined = 'qwertyuio'
) {
  const user = {
    username,
    email,
    password,
  }

  const response = await client.post('/users/register').json(user)
  return response
}
test.group('Authetication.', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('User is autheticated.', async ({ client }) => {
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
    const authenticated = await client.post('/auth').header('Cookie', cookies)
    authenticated.assertStatus(200)
    authenticated.assertBodyContains({
      message: 'User is logged in.',
    })
  })
  test('User is not authenticated.', async ({ client }) => {
    const authenticated = await client.post('/auth')
    authenticated.assertStatus(401)
  })
})
