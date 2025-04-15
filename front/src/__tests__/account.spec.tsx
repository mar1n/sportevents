import { render, screen } from '@testing-library/react'
import Account from '../pages/users/account'

describe('Account', () => {
  test('Account elements.', async () => {
    render(<Account />)

    screen.getByText('Account Page')
  })
  test('Show details of user', async () => {
    render(<Account />)

    await screen.findByText('Name: Szymon Dawidowicz')
  })
})
