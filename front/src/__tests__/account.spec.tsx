import { render, screen } from '@testing-library/react'
import { server } from '../msw/node'
import { setUrl } from '../utils/helper'
import { http, HttpResponse } from 'msw'
import Account from '../pages/users/account'
jest.mock('next/router', () => require('next-router-mock'))

describe('Account', () => {
  test('Account elements.', async () => {
    render(<Account />)
    await screen.findByText('Account Page')
    screen.getByText('CreateEvent')
    screen.getByText('DisplayEvents')
  })
  test('Show details of user', async () => {
    render(<Account />)
    await screen.findByText('Name: Szymon Dawidowicz')
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
  test('Display events own by User.', () => {})
  test('Display events attend by User.', () => {})
})
