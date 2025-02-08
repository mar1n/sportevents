import { test } from '@japa/runner'
import Events from '#models/event'

test.group('Event', () => {
  test('Create event', async ({ assert }) => {
    const title = 'NBA Game'
    const discription = 'Chicago Bulls and Phonix Suns will play game at Paris Stadium.'

    await Events.create({
      title: title,
      discription: discription,
    })

    const findEvent = await Events.findByOrFail('title', 'NBA Game')
    assert.equal(findEvent.title, title)
  })
})
