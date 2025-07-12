import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { setUrl } from '../../utils/helper'
import PageWithAuth from '../../components/providers/pageWithAuth'
import { Event } from './createevent'

function DisplayEvents() {
  const [events, setEvents] = useState<Event[] | null>(null)
  useEffect(() => {
    async function getEvents() {
      try {
        const respons = await axios.post(`${setUrl.getURL()}/events/displayevents`)
        setEvents(respons.data.events)
      } catch (error) {
      }
    }
    getEvents()
  }, [])
  return (
    <>
      <div>
        <h1>Events</h1>
        {events?.map((event) => {
          return (
            <div>
              <div>
                <h3>Title</h3>
                <p>{event.title}</p>
              </div>
              <div>
                <h3>Description</h3>
                <p>{event.description}</p>
              </div>
              <div>
                <h3>Address</h3>
                <p>{event.address}</p>
              </div>
              <div>
                <h3>Location</h3>
                <p>{event.location}</p>
              </div>
              <div>
                <h3>Start Event</h3>
                <p>{event.startEvent}</p>
              </div>
              <div>
                <h3>End Event</h3>
                <p>{event.endEvent}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default PageWithAuth(DisplayEvents)
