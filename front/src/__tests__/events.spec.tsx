import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateEvent from '../pages/events/createevent'
import { server } from '../msw/node'
import { eventsResponses } from '../msw/helper'
import { setUrl } from '../utils/helper'
import { http, HttpResponse } from 'msw'
import Displayevents from '../pages/events/displayevents'
jest.mock('next/router', () => require('next-router-mock'))

describe('Events', () => {
  describe('Create Events', () => {
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
  describe('Display Events', () => {
    test('Elements', async () => {
      render(<Displayevents />)
      expect(await screen.findByText('Events')).toBeInTheDocument()
      const titles = await screen.findAllByText('Title')
      titles.forEach((title) => {
        expect(title).toBeInTheDocument()
      })
      const descriptions = await screen.findAllByText('Description')
      descriptions.forEach((description) => {
        expect(description).toBeInTheDocument()
      })
      const locations = await screen.findAllByText('Location')
      locations.forEach((location) => {
        expect(location).toBeInTheDocument()
      })
      const addresses = await screen.findAllByText('Address')
      addresses.forEach((address) => {
        expect(address).toBeInTheDocument()
      })
      const startEvents = await screen.findAllByText('Start Event')
      startEvents.forEach((startEvent) => {
        expect(startEvent).toBeInTheDocument()
      })
      const endEvents = await screen.findAllByText('End Event')
      endEvents.forEach((endEvent) => {
        expect(endEvent).toBeInTheDocument()
      })
      const joinEventButtons = await screen.findAllByRole('button')
      joinEventButtons.forEach((button) => {
        expect(button).toBeInTheDocument()
      })
    })
    test('Join to Event', async () => {
      const { unmount } = render(<Displayevents />)
      const joinEventButtons = await screen.findAllByRole('button')
      joinEventButtons.forEach((button) => {
        expect(button).toBeInTheDocument()
      })

      expect(screen.queryByText('Yes')).not.toBeInTheDocument()
      expect(screen.queryByText('No')).not.toBeInTheDocument()
      await userEvent.click(screen.getByText('Join Wimbledon Event'))
      expect(screen.getByText('Yes')).toBeInTheDocument()
      expect(screen.getByText('No')).toBeInTheDocument()
      await userEvent.click(screen.getByText('Yes'))
      expect(screen.getByText('Szymon joined to event'))
      await userEvent.click(screen.getByText('Close'))
      expect(screen.queryByText('You joined to Wimbledon Event')).not.toBeInTheDocument()
      server.use(
        http.post(`${setUrl.mockSerever}/events/displayevents`, async ({ request }) => {
          return eventsResponses.listOfEventsWithParticipants()
        })
      )
      unmount()
      render(<Displayevents />)
      await screen.findByText('Leave Wimbledon Event')
      expect(screen.getByText('Leave Wimbledon Event')).toBeInTheDocument()
    })
    test('Leav Event', async() => {})
  })
})
