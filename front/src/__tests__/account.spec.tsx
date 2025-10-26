import { render, screen } from '@testing-library/react'
import { server } from '../msw/node'
import { setUrl } from '../utils/helper'
import { http, HttpResponse } from 'msw'
import Account from '../pages/users/account'
import MyEvents from '../pages/events/myevents'
import AttendEvents from 'pages/events/attendevents'
jest.mock('next/router', () => require('next-router-mock'))

describe('Account', () => {
  test('Account elements.', async () => {
    render(<Account />)
    await screen.findByText('Account Page')
    screen.getByText('CreateEvent')
    screen.getByText('DisplayEvents')
    screen.getByText('MyEvents')
    screen.getByText('AttendEvents')
  })
  test('Show details of user', async () => {
    render(<Account />)
    await screen.findByText('Name: Szymon')
  })
  test('User doesnt have access', async () => {
    server.use(
      http.get(`${setUrl.mockSerever}/auth`, async ({ request }) => {
        throw HttpResponse.json(
          {
            message: 'Please login to have access to page.'
          },
          { status: 401 }
        )
      })
    )
    render(<Account />)
    screen.getByText('Please login to have access to page.')
  })
  describe("Events", () => {
    test('Display events own by User.', async () => {
      render(<MyEvents />)
      await screen.findAllByText('Title')
      screen.getAllByText('Description')
      screen.getAllByText('Location')

      screen.getByText('NBA Game')
      screen.getByText('Game between famous teams...')
      screen.getByText('London')
      screen.getByText('Champions League')
      screen.getByText('Final of champions league in Germany...')
      screen.getByText('Berlin')
    })
    test('Display events attend by User.', async() => {
      render(<AttendEvents/>)
      await screen.findAllByText('Title')
      screen.getAllByText('Description')
      screen.getAllByText('Location')

      screen.getByText('NBA Game')
      screen.getByText('Game between famous teams...')
      screen.getByText('London')
      screen.getByText('Champions League')
      screen.getByText('Final of champions league in Germany...')
      screen.getByText('Berlin')
    })
  })
})
