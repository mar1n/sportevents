import axios from 'axios'
import PageWithAuth from '@/providers/pageWithAuth'
import { useState, useEffect } from 'react'
import { setUrl } from '../../utils/helper'
import { Event } from './createevent'
import { useRouter } from 'next/router'

const UpdatEvent = () => {
  const [event, setEvent] = useState<Event[] | null>(null)
  const [error, setError] = useState('')
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    async function getUserEvents() {
      try {
        const response = await axios.post(`${setUrl.getURL()}/events/display/userevents`)
        setEvent(response.data.events)
      } catch (error) {}
    }
    getUserEvents()
  })
  return (
    <>
    <div>{id}</div>
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

export default PageWithAuth(UpdatEvent)
