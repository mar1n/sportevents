import '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import Register from '../pages/users/register'
import { server } from '../msw/node'
describe('Register', () => {
    test('User elements.', async () => {
        render(<Register />)

        expect(screen.getByText('Register User')).toBeInTheDocument()
        expect(screen.getByLabelText('RegisterForm')).toBeInTheDocument()
        expect(screen.getByText('User Name')).toBeInTheDocument()
        expect(screen.getByText('Email')).toBeInTheDocument()
        expect(screen.getByText('Password')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('User Name')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
    test('The username field must be defined.', async () => {
        server.events.on('request:start', ({request}) => {
            console.log('MSW intercepted', request.method)
        })
        render(<Register/>)
        await fireEvent.click(screen.getByRole('button'))
        expect(screen.getByText('The username field must be defined.'))
    })
})