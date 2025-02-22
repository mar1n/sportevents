/// <reference types="jest" />
import '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import Register from '../pages/users/register'
describe('Register', () => {
    test('Register User journey.', async () => {
        render(<Register />)

        expect(screen.getByText('Register User')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('UserName')).toBeInTheDocument()
    })
})