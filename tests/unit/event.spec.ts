import { test } from '@japa/runner'
import Events from '#models/event'

import { DateTime } from 'luxon'
test.group('Event', () => {
  test('Create event', async ({ assert }) => {
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
  })
})
