import { test } from '@japa/runner'
import User from '#models/user'

test.group('Users Controller', () => {
  test('get users', async ({ client }) => {
    const body = { name: 'Szymon', userName: 'Dawidowicz' }
    const response = await client.post('/users').json(body)
    response.assertStatus(200)
    response.assertBody({
      message: 'POST users',
      body: body,
    })
  })
  test('create user', async ({ client, assert }) => {
    const user = { username: 'Szymon Dawidowicz', email: 'szymon@fastmail.com', password: '666' }

    const response = await client.post('/users').json(user)
    response.assertStatus(200)
    response.assertBody({ message: 'user created' })
    const findUser = await User.findByOrFail('password', '666')
    assert.equal(findUser.password, user.password)
  })
})
