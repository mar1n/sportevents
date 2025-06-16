import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateEvent from '../pages/events/createevent'
import { server } from '../msw/node'
import { eventsResponses } from '../msw/helper'
import { http } from 'msw'
import * as nookies from 'nookies'
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('nookies')
const mockedNookies = jest.mocked(nookies)
describe('Events', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    mockedNookies.parseCookies.mockReturnValue({ isAuthenticated: 'mocked-token' })
  })
  test('Elements.', async () => {
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
  test('Empty Fields.', async () => {
    server.use(
      http.post('http://localhost:6666/events', async ({ request }) => {
        eventsResponses.allInputsFieldsAreEmpty()
      })
    )
    render(<CreateEvent />)
    await userEvent.click(screen.getByRole('button'))
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
