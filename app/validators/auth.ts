import vine from '@vinejs/vine'

export const createRegisterValidator = vine.compile(
  vine.object({
    username: vine.string(),
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(24),
  })
)

export const createLoginValidator = vine.compile(
  vine.object({
    email: vine.string().minLength(5),
    password: vine.string().minLength(8),
  })
)
