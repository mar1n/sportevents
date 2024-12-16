import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

test.group('Users Controller', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  test('get users', async ({ client }) => {
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
  test('create user', async ({ client, assert }) => {
    hash.fake()
    const user = { username: 'Szymon Dawidowicz', email: 'szymon@fastmail.com', password: '666' }

    const response = await client.post('/users').json(user)
    response.assertStatus(200)
    response.assertBody({ message: 'user created' })
    const findUser = await User.findByOrFail('password', '666')
    assert.equal(findUser.password, user.password)
    hash.restore()
  })
})
