import axios from 'axios'
import { useState, useEffect } from 'react'
import { Event } from './createevent'
import PageWithAuth from '@/providers/pageWithAuth'
import { setUrl } from 'utils/helper'

const AttendEvents = () => {
  const [event, setEvent] = useState<Event[] | null>(null)
  const [error, setError] = useState('')
  useEffect(() => {
    async function getAttendEvents() {
      try {
        const response = await axios.get(`${setUrl.getURL()}/events/display/attend`, {
          withCredentials: true,
        })
        setEvent(response.data.events)
      } catch (error) {}
    }
    getAttendEvents()
  }, [])
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Attend Events</h1>
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

export default PageWithAuth(AttendEvents)
