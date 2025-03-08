import { render, screen } from '@testing-library/react'
import Login from "../pages/users/login"

describe('Login', () => {
    test('Login elements.', async () => {
        render(<Login/>)

        expect(screen.getByText('Login')).toBeInTheDocument()
        expect(screen.getByLabelText('Login Form')).toBeInTheDocument()
        expect(screen.getByText('User Name')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('User Name')).toBeInTheDocument()
        expect(screen.getByText('Password')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
})