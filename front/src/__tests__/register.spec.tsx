/// <reference types="jest" />
import '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import Register from '../pages/users/register'
describe('Register', () => {
    test('User elements.', async () => {
        render(<Register />)

        expect(screen.getByText('Register User')).toBeInTheDocument()
        expect(screen.getByLabelText('RegisterForm')).toBeInTheDocument()
        expect(screen.getByText('UserName')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('UserName')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
    test('Field User Name is empty.', async () => {
        render(<Register/>)
        await fireEvent.click(screen.getByRole('button'))
        expect(screen.getByText('Field user name is empty.'))
    })
})