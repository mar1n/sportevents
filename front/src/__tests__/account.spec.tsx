import { render, screen } from '@testing-library/react'
import Account from '../pages/users/account'
import * as nookies from 'nookies'
jest.mock('next/router', () => require('next-router-mock'));
jest.mock('nookies')
// Object.defineProperty(window.document, 'cookie', {
//   writable: true,
//   value: 'isAuthenticated=omnomnom',
// });
const mockedNookies = jest.mocked(nookies);

describe('Account', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('Account elements.', async () => {
    mockedNookies.parseCookies.mockReturnValue({ isAuthenticated: 'mocked-token' });
    render(<Account />)

    screen.getByText('Account Page')
  })
  test('Show details of user', async () => {
    mockedNookies.parseCookies.mockReturnValue({ isAuthenticated: 'mocked-token' });
    render(<Account />)

    await screen.findByText('Name: Szymon Dawidowicz')
  })
})
