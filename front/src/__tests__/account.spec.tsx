import { render, screen } from '@testing-library/react'
import Account from '../pages/users/account'
import * as nookies from 'nookies'
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('nookies')
// Object.defineProperty(window.document, 'cookie', {
//   writable: true,
//   value: 'isAuthenticated=omnomnom',
// });
const mockedNookies = jest.mocked(nookies)

describe('Account', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    mockedNookies.parseCookies.mockReturnValue({ isAuthenticated: 'mocked-token' })
  })
  test('Account elements.', async () => {
    render(<Account />)
    screen.getByText('Account Page')
  })
  test('Show details of user', async () => {
    render(<Account />)
    await screen.findByText('Name: Szymon Dawidowicz')
  })
  test('User doesnt have access', async () => {
    mockedNookies.parseCookies.mockReturnValue({})
    render(<Account />)
    screen.getByText('Please login to have access to page.')
  })
})
