import { render, screen } from '@testing-library/react'
import CreateEvent from "../pages/events/createevent"

describe('Events', () => {
    test('Events Elements', async() => {
        render(<CreateEvent />)

        expect(screen.getByText('Create Event')).toBeInTheDocument()
        expect(screen.getByLabelText('Event Form')).toBeInTheDocument()
        expect(screen.getByText('Title')).toBeInTheDocument()
        // expect(screen.getByText('Email')).toBeInTheDocument()
        // expect(screen.getByText('Password')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Title')).toBeInTheDocument()
        // expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
        // expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()

    })
})