import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateEvent from '../pages/events/createevent'
import { server } from '../msw/node'
import { eventsResponses } from '../msw/helper'
import { setUrl } from '../utils/helper'
import { http } from 'msw'
jest.mock('next/router', () => require('next-router-mock'))

describe('Events', () => {
  test('Elements.', async () => {
    render(<CreateEvent />)
    expect(await screen.findByText('Create Event')).toBeInTheDocument()
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
  test('Empty fields validation.', async () => {
    server.use(
      http.post(`${setUrl.mockSerever}/events`, async ({ request }) => {
        eventsResponses.allInputsFieldsAreEmpty()
      })
    )
    render(<CreateEvent />)
    await userEvent.click(await screen.findByRole('button'))
    await waitFor(() => {
      expect(screen.getByText('The title field must be defined'))
      expect(screen.getByText('The description field must be defined'))
      expect(screen.getByText('The location field must be defined'))
      expect(screen.getByText('The address field must be defined'))
      expect(screen.getByText('The startEvent field must be defined'))
      expect(screen.getByText('The endEvent field must be defined'))
    })
  })
})
