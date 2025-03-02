import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('http://localhost:3001/users/register', () =>
    HttpResponse.json({
      message: 'Check your email please.',
    })
  ),
  http.get('http://localhost:3001/register', () =>
    HttpResponse.json({
      message: 'Check your email please.',
    })
  ),
  http.get('http://localhost:3001/users/:username', () =>
    HttpResponse.json({ username: 'Szymon', email: 'cykcykacz@gmail.com' })
  ),
  http.post('http://localhost:3000/user/register', () => {
    HttpResponse.json({ message: 'User created' })
  }),
  http.post('http://localhost:6666/users/register', async ({ request }) => {
    const user: any = await request.json()
    if (!user.username.length && !user.email.length && !user.password.length) {
      throw HttpResponse.json(
        {
          errors: [
            {
              message: 'The username field must be defined',
              rule: 'required',
              field: 'username',
            },
            {
              message: 'The email field must be defined',
              rule: 'required',
              field: 'email',
            },
            {
              message: 'The password field must be defined',
              rule: 'required',
              field: 'password',
            },
          ],
        },
        { status: 422 }
      )
    }
    if (user.username && user.email === 'szymondawidowiczfastmail.com' && user.password) {
      throw HttpResponse.json(
        {
          errors: [
            {
              message: 'The email field must be a valid email address',
              rule: 'required',
              field: 'email',
            },
          ],
        },
        { status: 422 }
      )
    }
    if (user.username && user.email && user.password.length < 8) {
      throw HttpResponse.json(
        {
          errors: [
            {
              message: 'The password field must have at least 8 characters',
              rule: 'required',
              field: 'password',
            },
          ],
        },
        { status: 422 }
      )
    }
    return HttpResponse.json({
      message: 'User registered successfully',
    })
  }),
]
