import vine from '@vinejs/vine'

export const createEventValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(5).maxLength(255),
    description: vine.string().minLength(5),
  })
)
