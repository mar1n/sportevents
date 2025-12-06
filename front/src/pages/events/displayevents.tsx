import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { setUrl } from '../../utils/helper'
import PageWithAuth from '@/providers/pageWithAuth'
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
  const [openJoinPopup, setOpenJoinPopUp] = useState(false)
  const [openLeavePopup, setOpenLeavePopUp] = useState(false)
  const [event, setEvent] = useState<JoinedEvent | null>(null)
  const [confirmationMessage, setConfirmationMessage] = useState('')
  const getEvents = useCallback(async function getEvents() {
      try {
        const response = await axios.post(`${setUrl.getURL()}/events/display`, {}, { withCredentials: true })
        setEvents(response.data.events)
        setCurrentUserId(response.data.currentUserId)
      } catch (error) {}
    }, [])
  useEffect(() => {
    getEvents()
  }, [getEvents])
  const openJoinEvent = (title: string, id: number) => {
    setOpenJoinPopUp(true)
    setEvent((event) => ({ ...event, id, title }))
  }
  const openLeaveEvent = (title: string, id: number) => {
    setOpenLeavePopUp(true)
    setEvent((event) => ({ ...event, id, title }))
  }
  const joinEvent = async (title: string) => {
    try {
      const response = await axios.post(`${setUrl.getURL()}/events/join`, {
        eventId: event?.id
      }, { withCredentials: true })
      setConfirmationMessage(`${response.data.message}`)
    } catch (error) {}
  }
  const leaveEvent = async (title: string) => {
    try {
      const response = await axios.post(`${setUrl.getURL()}/events/leave`, {
        eventId: event?.id
      }, { withCredentials: true })
      setConfirmationMessage(`${response.data.message}`)
    } catch (error) {}
  }
  const close = async () => {
    setConfirmationMessage('')
    setOpenJoinPopUp(false)
    setOpenLeavePopUp(false)
    await getEvents()
  }
  return (
    <>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h1 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>Events</h1>
      </div>
      <div>
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
                    onClick={() => openLeaveEvent(event.title, event.id)}
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
        {openJoinPopup && (
          <div>
            Join Event{' '}
            <Button
              name={'Yes'}
              className="joinEventYes"
              onClick={() => {
                if (event?.title) {
                  joinEvent(event.title)
                }
              }}
            />
            <Button name={'No'} className="joinEventNo" />
          </div>
        )}
        {openLeavePopup && (
          <div>
            Leave Event{' '}
            <Button
              name={'Yes'}
              className="leavEventYes"
              onClick={() => {
                if (event?.title) {
                  leaveEvent(event.title)
                }
              }}
            />
            <Button name={'No'} className="leavEventNo" />
          </div>
        )}
        {confirmationMessage && openJoinPopup && (
          <div>
            You joined to {event?.title} Event
            <Button name={'Close'} className="close" onClick={() => close()} />
            <div>{confirmationMessage}</div>
          </div>
        )}
        {confirmationMessage && openLeavePopup && (
          <div>
            You left {event?.title} Event
            <Button name={'Close'} className="close" onClick={() => close()} />
            <div>{confirmationMessage}</div>
          </div>
        )}
      </div>
    </>
  )
}

export default PageWithAuth(DisplayEvents)
