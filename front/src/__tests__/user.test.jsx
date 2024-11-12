import '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
//import { act } from 'react'
//import { server } from '../msw/node'
//import { http, HttpResponse } from 'msw'
import SignUp from '../pages/user/signUp'

describe('User', () => {
    test('User register journey success.', async () => {
        render(<SignUp/>)
        const userEvents = userEvent.setup()

        const headLine = screen.getByText('Sign Up Page')
        expect(headLine).toBeInTheDocument()
        const signUpForm = screen.getByRole('form', {name: 'signUp'})
        expect(signUpForm).toBeInTheDocument()
        const emailInput = screen.queryByPlaceholderText('emailSignUp')
        expect(emailInput).toBeInTheDocument()
        const passwordInput = screen.queryByPlaceholderText('passwordSignUp')
        expect(passwordInput).toBeInTheDocument()
        const buttonSignUp = screen.getByRole('button', {name: 'signUp'})
        expect(buttonSignUp).toBeInTheDocument()

        await userEvents.click(buttonSignUp);
        const successMessage = screen.getByText('Check your email please.')
        expect(successMessage).toBeInTheDocument()

    });
})