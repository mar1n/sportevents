import { http, HttpResponse } from 'msw'
import { User } from '../pages/users/register'
export const handlers = [
  http.post('http://localhost:6666/users/register', async ({ request }) => {
    const user = (await request.json()) as User
    return HttpResponse.json(
      {
        message: `We've sent you email, please read.`,
      },
      { status: 201 }
    )
  }),
  http.get('http://localhost:6666/auth/login', async ({ request }) => {
    return HttpResponse.json(
      {
        message: `Successful Login.`,
      },
      { status: 200, headers: { 'Set-Cookie': 'isAuthenticated=abc-123' } }
    )
  }),
  http.get('http://localhost:6666/users/account', async ({ request }) => {
    return HttpResponse.json(
      {
        user: `Szymon Dawidowicz`,
      },
      { status: 200, headers: { 'Set-Cookie': 'isAuthenticated=abc-123' } }
    )
  }),
  http.post('http://localhost:6666/events', async ({ request }) => {
    return HttpResponse.json(
      {
        message: `Event created successfully`,
      },
      { status: 200, headers: { 'Set-Cookie': 'isAuthenticated=abc-123' } }
    )
  }),
  http.post('http://localhost:6666/events/displayevents', async ({ request }) => {
    return HttpResponse.json(
      {
        message: `Events of Szymon Dawidowicz`,
        events: [
          {
            title: 'Even Title',
            description: 'My discription of event...',
            location: 'London',
            address: 'Queen Elizabeth Road',
            startEvent: '2025-02-15 01:00:00',
            endEvent: '2025-02-16 01:00:00',
          },
        ],
      },
      { status: 200, headers: { 'Set-Cookie': 'isAuthenticated=abc-123' } }
    )
  }),
]
