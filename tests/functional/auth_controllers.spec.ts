import { test } from '@japa/runner'
import User from '#models/user'

test.group('Auth Controller', () => {
  test('Register user', async ({ client, assert }) => {
    const user = { username: 'Szymon Dawidowicz', email: 'szymon@fastmail.com', password: '666' }

    const response = await client.post('/users/register').json(user)
    response.assertStatus(201)
    const findUser = await User.findByOrFail('username', 'Szymon Dawidowicz')
    assert.equal(findUser.username, user.username)
  })
})
