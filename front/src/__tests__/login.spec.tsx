import { render, screen } from '@testing-library/react'
import Login from "../pages/users/login"

describe('Login', () => {
    test('Login elements.', async () => {
        render(<Login/>)

        expect(screen.getByText('Login')).toBeInTheDocument()
    })
})