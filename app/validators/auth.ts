import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
  vine.object({
    username: vine.string(),
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(24),
  })
)
