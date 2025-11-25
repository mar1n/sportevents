import { http, HttpResponse } from 'msw'
import { User } from '../pages/users/register'
import { setUrl } from '../utils/helper'
export const handlers = [
  http.post(`${setUrl.mockSerever}/users/register`, async ({ request }) => {
    const user = (await request.json()) as User
    return HttpResponse.json(
      {
        message: `We've sent you email, please read.`,
      },
      { status: 201 }
    )
  }),
  http.post(`${setUrl.mockSerever}/auth/login`, async ({ request }) => {
    return HttpResponse.json(
      {
        message: `Successful Login.`,
      },
      { status: 200, headers: { 'Set-Cookie': 'isAuthenticated=abc-123' } }
    )
  }),
  http.get(`${setUrl.mockSerever}/auth`, async ({}) => {
    return HttpResponse.json({ message: 'User is logged in.' })
  }),
  http.get(`${setUrl.mockSerever}/users/account`, async ({ request }) => {
    return HttpResponse.json(
      {
        user: {
          id: 1,
          username: 'Szymon',
          email: 'szymondawidowicz@fastmail.com',
        },
      },
      { status: 200, headers: { 'Set-Cookie': 'isAuthenticated=abc-123' } }
    )
  }),
  http.post(`${setUrl.mockSerever}/events`, async ({ request }) => {
    return HttpResponse.json(
      {
        message: `Event created successfully`,
      },
      { status: 200, headers: { 'Set-Cookie': 'isAuthenticated=abc-123' } }
    )
  }),
  http.post(`${setUrl.mockSerever}/events/display`, async ({ request }) => {
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
            users: [],
          },
          {
            title: 'Wimbledon',
            description: 'Teenis Event',
            location: 'London',
            address: 'Wimbledon Road',
            startEvent: '2025-02-15 01:00:00',
            endEvent: '2025-02-16 01:00:00',
            users: [],
          },
        ],
        currentUserId: 1,
      },
      { status: 200, headers: { 'Set-Cookie': 'isAuthenticated=abc-123' } }
    )
  }),
  http.post(`${setUrl.mockSerever}/events/join`, async ({ request }) => {
    return HttpResponse.json(
      {
        message: `Szymon joined to event`,
      },
      { status: 200, headers: { 'Set-Cookie': 'isAuthenticated=abc-123' } }
    )
  }),
  http.post(`${setUrl.mockSerever}/events/leave`, async ({ request }) => {
    return HttpResponse.json(
      {
        message: `Szymon left Wimbledon event`,
      },
      { status: 200, headers: { 'Set-Cookie': 'isAuthenticated=abc-123' } }
    )
  }),
  http.post(`${setUrl.mockSerever}/events/display/userevents`, async ({ request }) => {
    return HttpResponse.json(
      {
        message: `Events of Szymon`,
        events: [
          {
            id: 2,
            title: 'NBA Game',
            description: 'Game between famous teams...',
            location: 'London',
            address: 'Queen Elizabeth Road',
            userName: 'Alfredo',
            startEvent: '2025-03-15T01:00:00.000+00:00',
            endEvent: '2025-03-16T01:00:00.000+00:00',
            users: [{ id: 2, username: 'Alfredo', email: 'cykcykacz@gmail.com' }],
          },
          {
            id: 3,
            title: 'Champions League',
            description: 'Final of champions league in Germany...',
            location: 'Berlin',
            address: 'Queen Elizabeth Road',
            userName: 'Alfredo',
            startEvent: '2025-03-15T01:00:00.000+00:00',
            endEvent: '2025-03-16T01:00:00.000+00:00',
            users: [{ id: 2, username: 'Alfredo', email: 'cykcykacz@gmail.com' }],
          },
        ],
        currentUserId: 2,
      },
      { status: 200, headers: { 'Set-Cookie': 'isAuthenticated=abc-123' } }
    )
  }),
  http.get(`${setUrl.mockSerever}/events/display/attend`, async ({ request }) => {
    return HttpResponse.json(
      {
        message: `Events of Szymon`,
        events: [
          {
            id: 2,
            title: 'NBA Game',
            description: 'Game between famous teams...',
            location: 'London',
            address: 'Queen Elizabeth Road',
            userName: 'Alfredo',
            startEvent: '2025-03-15T01:00:00.000+00:00',
            endEvent: '2025-03-16T01:00:00.000+00:00',
            users: [{ id: 2, username: 'Alfredo', email: 'cykcykacz@gmail.com' }],
          },
          {
            id: 3,
            title: 'Champions League',
            description: 'Final of champions league in Germany...',
            location: 'Berlin',
            address: 'Queen Elizabeth Road',
            userName: 'Alfredo',
            startEvent: '2025-03-15T01:00:00.000+00:00',
            endEvent: '2025-03-16T01:00:00.000+00:00',
            users: [{ id: 2, username: 'Alfredo', email: 'cykcykacz@gmail.com' }],
          },
        ],
        currentUserId: 2,
      },
      { status: 200, headers: { 'Set-Cookie': 'isAuthenticated=abc-123' } }
    )
  }),
  http.get(`${setUrl.mockSerever}/events/display/event/:id`, async ({ request, params }) => {
    const { id } = params

    return HttpResponse.json(
      {
        message: `Event ${id} for Szymon`,
        event: {
          id: 2,
          title: 'NBA Game',
          description: 'Game between famous teams...',
          location: 'London',
          address: 'Queen Elizabeth Road',
          userName: 'Alfredo',
          startEvent: '2025-03-15T01:00:00.000+00:00',
          endEvent: '2025-03-16T01:00:00.000+00:00',
          users: [{ id: 2, username: 'Alfredo', email: 'cykcykacz@gmail.com' }],
        },
      },
      { status: 200, headers: { 'Set-Cookie': 'isAuthenticated=abc-123' } }
    )
  }),
  http.post(`${setUrl.mockSerever}/events/update`, async ({ request }) => {
    return HttpResponse.json(
      {
        message: `Event has been updated`,
        event: {
          id: 2,
          title: 'NBA Game',
          description: 'Game between famous teams...',
          location: 'Berlin',
          address: 'Queen Elizabeth Road',
          userName: 'Alfredo',
          startEvent: '2025-03-15T01:00:00.000+00:00',
          endEvent: '2025-03-16T01:00:00.000+00:00',
          users: [{ id: 2, username: 'Alfredo', email: 'cykcykacz@gmail.com' }],
        },
      },
      { status: 200, headers: { 'Set-Cookie': 'isAuthenticated=abc-123' } }
    )
  }),
]
