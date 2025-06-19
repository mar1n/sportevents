import '@testing-library/dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Register from '../pages/users/register'
import { server } from '../msw/node'
import { registerResponses } from "../msw/helper"
import { setUrl } from '../utils/helper'
import { http } from 'msw'
describe('Register', () => {
    test('User elements.', async () => {
        render(<Register />)

        expect(screen.getByText('Register User')).toBeInTheDocument()
        expect(screen.getByLabelText('Register Form')).toBeInTheDocument()
        expect(screen.getByText('User Name')).toBeInTheDocument()
        expect(screen.getByText('Email')).toBeInTheDocument()
        expect(screen.getByText('Password')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('User Name')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
    test('Empty fields.', async () => {
        server.use(http.post(`${setUrl.mockSerever}/users/register`, async ({request}) => {
            registerResponses.allInputsFieldsAreEmpty()
        }))
        render(<Register/>)
        await userEvent.click(screen.getByRole('button'))
        await waitFor(() => {
            expect(screen.getByText('The username field must be defined'))
            expect(screen.getByText('The email field must be defined'))
            expect(screen.getByText('The password field must be defined'))
        })
    })
    test('Invalid email address', async () => {
        server.use(http.post(`${setUrl.mockSerever}/users/register`, async ({request}) => {
            registerResponses.invalidEmail()
        }))
        render(<Register/>)
        await userEvent.type(screen.getByPlaceholderText('User Name'), 'Szymon')
        await userEvent.type(screen.getByPlaceholderText('Email'), 'szymondawidowiczfastmail.com')
        await userEvent.type(screen.getByPlaceholderText('Password'), '1234567')
        await userEvent.click(screen.getByRole('button'))
        await waitFor(() => {
            expect(screen.getByText('The email field must be a valid email address'))
        })
    })
    test('Password has invalid length of characters.', async () => {
        server.use(http.post(`${setUrl.mockSerever}/users/register`, async ({request}) => {
            registerResponses.invalidPasswordLength()
        }))
        render(<Register/>)
        await userEvent.type(screen.getByPlaceholderText('User Name'), 'Szymon')
        await userEvent.type(screen.getByPlaceholderText('Email'), 'szymondawidowicz@fastmail.com')
        await userEvent.type(screen.getByPlaceholderText('Password'), '124')
        await userEvent.click(screen.getByRole('button'))
        await waitFor(() => {
            expect(screen.getByText('The password field must have at least 8 characters'))
        })
    })
})