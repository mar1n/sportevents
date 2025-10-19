import axios from 'axios'
import { useState, useEffect } from 'react'
import PageWithAuth from '@/providers/pageWithAuth'
import { Event } from './createevent'

const MyEvents = () => {
  const [event, setEvent] = useState<Event[] | null>(null)
  const [error, setError] = useState('')
  useEffect(() => {
    async function getUserEvents() {
        try {
            
        } catch (error) {
            
        }
    }
  })
  return (
    <>
      <div>Title</div>
      <div>Description</div>
      <div>Location</div>
    </>
  )
}

export default PageWithAuth(MyEvents)
