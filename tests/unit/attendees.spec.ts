import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import Events from '#models/event'
import User from '#models/user'
import Attendee from '#models/attendee'
import { DateTime } from 'luxon'

test.group('Attendees', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  test('Create attendees', async ({ assert }) => {
    const username = 'Szymon'
    const email = 'szymondawidowicz@fastmail.com'
    const password = 'radadadadada'

    await User.create({
      username: username,
      email: email,
      password: password,
    })

    const findUser = await User.findByOrFail('email', 'szymondawidowicz@fastmail.com')
    assert.equal(findUser.email, email)

    const title = 'NBA Game'
    const discription = 'Chicago Bulls and Phonix Suns will play game at Paris Stadium.'
    const startDate = DateTime.now()
    const endDate = DateTime.now()
    const location = 'London'
    const address = 'Queen Elizabeth Road'
    const userName = 'Szymon'

    await Events.create({
      title: title,
      description: discription,
      startEvent: startDate,
      endEvent: endDate,
      location: location,
      address: address,
      userName: userName,
    })

    const findEvent = await Events.findByOrFail('title', 'NBA Game')
    assert.equal(findEvent.title, title)

    await findUser.related('attendees').create({
      eventsId: 1,
    })
    const attendees = await Attendee.query().preload('user').preload('event')

    const attendee = attendees[0]

    assert.equal(attendee.user.username, 'Szymon')
    assert.equal(attendee.user.email, 'szymondawidowicz@fastmail.com')
    assert.equal(attendee.event.title, 'NBA Game')
  })
})
