import { render, screen, waitFor } from '@testing-library/react'
import Login from "../pages/users/login"
import userEvent from '@testing-library/user-event'
import { server } from '../msw/node'
import { http } from 'msw'
import { loginResponses } from '../msw/helper'
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
    test('Empty Fields.', async () => {
        server.use(http.get('http://localhost:6666/users/login', async ({request}) => {
            loginResponses.allValidationFails()
        }))
        render(<Login />)
        await userEvent.click(screen.getByRole('button'))
        await waitFor(() => {
            expect(screen.getByText('The username field must be defined'))
            expect(screen.getByText('The password field must be defined'))
        })
    })
    test('Invalid credentials', async() => {
        server.use(http.get('http://localhost:6666/users/login', async () => {
            loginResponses.invaldiCredentials()
        }))
        render(<Login/>)
        await userEvent.type(screen.getByPlaceholderText('User Name'), 'Unknown')
        await userEvent.type(screen.getByPlaceholderText('Password'), 'randomPassword')
        await userEvent.click(screen.getByRole('button'))
        await waitFor(() => {
            expect(screen.getByText('Invalid user credentials'))
        })
    })
})