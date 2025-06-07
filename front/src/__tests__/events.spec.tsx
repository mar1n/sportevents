import { render, screen } from '@testing-library/react'
import CreateEvent from "../pages/events/createevent"
import { server } from "../msw/node"
import { eventsResponses } from "../msw/helper"
describe('Events', () => {
    test('Elements.', async() => {
        render(<CreateEvent />)

        expect(screen.getByText('Create Event')).toBeInTheDocument()
        expect(screen.getByLabelText('Event Form')).toBeInTheDocument()
        expect(screen.getByText('Title')).toBeInTheDocument()
        expect(screen.getByText('Description')).toBeInTheDocument()
        expect(screen.getByText('Location')).toBeInTheDocument()
        expect(screen.getByText('Address')).toBeInTheDocument()
        expect(screen.getByText('StartEvent')).toBeInTheDocument()
        expect(screen.getByText('EndEvent')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Title')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Description')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Location')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Address')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('StartEvent')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('EndEvent')).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()

    })
    test.skip('Empty Fields.', async () => {

    })
})