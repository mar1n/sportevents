import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { setUrl } from '../../utils/helper'
import PageWithAuth from '../../components/providers/pageWithAuth'
import { Event } from './createevent'
type User = {
  id: number
  username: string
  email: string
}
type EventWithId = Event & { id: number; users: User[] }
type JoinedEvent = {
  id: number
  title: string
}
import Button from '@/components/button/button'
function DisplayEvents() {
  const [events, setEvents] = useState<EventWithId[] | null>(null)
  const [currentUserId, setCurrentUserId] = useState(null)
  const [open, setOpen] = useState(false)
  const [joinedEvent, setjoinedEvent] = useState<JoinedEvent | null>(null)
  const [confirmationMessage, setConfirmationMessage] = useState('')
  useEffect(() => {
    async function getEvents() {
      try {
        const respons = await axios.post(`${setUrl.getURL()}/events/displayevents`)
        setEvents(respons.data.events)
        setCurrentUserId(respons.data.currentUserId)
      } catch (error) {}
    }
    getEvents()
  }, [])
  const openJoinEvent = (title: string, id: number) => {
    setOpen(true)
    setjoinedEvent((event) => ({ ...event, id, title }))
  }
  const joinEvent = (title: string) => {
    setConfirmationMessage(`You join to ${title} Event`)
  }
  const close = () => {
    setConfirmationMessage('')
    setOpen(false)
  }
  return (
    <>
      <div>
        <h1>Events</h1>
        {events?.map((event, index) => {
          return (
            <div key={index}>
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
              <div>
                {event.users.find((user) => user.id === currentUserId) ? (
                  <Button
                    name={`Leave ${event.title} Event`}
                    className="leavEvent"
                    onClick={() => 0}
                  />
                ) : (
                  <Button
                    name={`Join ${event.title} Event`}
                    className="joinEvent"
                    onClick={() => openJoinEvent(event.title, event.id)}
                  />
                )}
              </div>
            </div>
          )
        })}
        {open && (
          <div>
            Join Event{' '}
            <Button
              name={'Yes'}
              className="joinEventYes"
              onClick={() => {
                if (joinedEvent?.title) {
                  joinEvent(joinedEvent.title)
                }
              }}
            />
            <Button name={'No'} className="joinEventNo" />
          </div>
        )}
        {confirmationMessage && (
          <div>
            You joined to {joinedEvent?.title} Event
            <Button name={'Close'} className="close" onClick={() => close()} />
          </div>
        )}
      </div>
    </>
  )
}

export default PageWithAuth(DisplayEvents)
