import axios from 'axios'
import { useState, useEffect } from 'react'
import PageWithAuth from '@/providers/pageWithAuth'
import { Event } from './createevent'
import { setUrl } from 'utils/helper'

const MyEvents = () => {
  const [event, setEvent] = useState<Event[] | null>(null)
  const [error, setError] = useState('')
  useEffect(() => {
    async function getUserEvents() {
      try {
        const response = await axios.post(
          `${setUrl.getURL()}/events/display/userevents`,
          {},
          {
            withCredentials: true,
          }
        )
        setEvent(response.data.events)
      } catch (error) {}
    }
    getUserEvents()
  }, [])
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          My Events
        </h1>
      </div>
      {event &&
        event?.map((event) => {
          return (
            <div key={event.title}>
              <div>Title</div>
              <div>{event.title}</div>
              <div>Description</div>
              <div>{event.description}</div>
              <div>Location</div>
              <div>{event.location}</div>
            </div>
          )
        })}
    </>
  )
}

export default PageWithAuth(MyEvents)
