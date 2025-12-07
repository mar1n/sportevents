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
        <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Attend Events
        </h1>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full  sm:max-w-sm">
        {event &&
          event?.map((event) => {
            return (
              <div className="space-y-6" key={event.title}>
                <div>
                  <h3 className="mt-10 text-left text-3xl font-bold text-heading">Title</h3>
                  <p className="mb-3 text-body">{event.title}</p>
                </div>
                <div>
                  <h3 className="mt-10 text-left text-3xl font-bold text-heading">Description</h3>
                  <p className="mb-3 text-body">{event.description}</p>
                </div>
                <div>
                  <h3 className="mt-10 text-left text-3xl font-bold text-heading">Location</h3>
                  <p className="mb-3 text-body">{event.location}</p>
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default PageWithAuth(AttendEvents)
