import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const createEventValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(5).maxLength(255),
    description: vine.string().minLength(5),
    location: vine.string().minLength(5),
    address: vine.string().minLength(5),
    userName: vine.string().minLength(5),
    startEvent: vine
      .date({ formats: { utc: true } })
      .beforeField('endEvent')
      .transform((date) => DateTime.fromJSDate(date)),
    endEvent: vine
      .date({ formats: { utc: true } })
      .afterField('startEvent')
      .transform((date) => DateTime.fromJSDate(date)),
  })
)
