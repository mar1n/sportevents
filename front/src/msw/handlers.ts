import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('http://localhost:3001/users/register', () =>
    HttpResponse.json({
      message: 'user created',
    })
  ),
  http.get('http://localhost:3001/users/:username', () =>
    HttpResponse.json({ username: 'Szymon', email: 'cykcykacz@gmail.com' })
  ),
  http.post('http://localhost:3000/user/register', () => {
    HttpResponse.json({ message: 'User created' })
  }),
]
