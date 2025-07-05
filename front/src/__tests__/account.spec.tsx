import { render, screen } from '@testing-library/react'
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
    render(<Account />)

    await screen.findByText('Please login to have access to page.')
  })
})
