import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { ApiClient } from '@japa/api-client'

async function loginHelper(client: ApiClient) {
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
  const response = await client.post('/auth/login').json(userLogin)
  response.assertStatus(200)
  response.assertBodyContains({
    message: 'Valid credentials',
  })

  return response.headers()['set-cookie']
}

test.group('Account Controller', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  test('Show user name', async ({ client }) => {
    const cookie = await loginHelper(client)
    const accountRoute = await client.get('/account').header('Cookie', cookie)
    accountRoute.assertStatus(200)
    accountRoute.assertBodyContains({
      message: 'User Account',
      user: { email: 'szymon@fastmail.com' },
    })
  })
})
