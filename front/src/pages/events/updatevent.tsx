import axios from 'axios'
import PageWithAuth from '@/providers/pageWithAuth'
import { useState, useEffect } from 'react'
import { setUrl } from '../../utils/helper'
import { Event } from './createevent'
import { useRouter } from 'next/router'
import Form from '@/components/form/form'
import Label from '@/components/label/label'
import Input from '@/components/input/input'
import Button from '@/components/button/button'
const UpdatEvent = () => {
  const [event, setEvent] = useState<Event>({
    title: '',
    description: '',
    location: '',
    address: '',
    startEvent: '',
    endEvent: '',
  })
  const [error, setError] = useState<Event>({
    title: '',
    description: '',
    location: '',
    address: '',
    startEvent: '',
    endEvent: '',
  })
  const [confimationMessage, setConfirmationMessage] = useState<string>('')
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    if (!id) return
    async function getUserEvents() {
      try {
        const response = await axios.get(`${setUrl.getURL()}/events/display/event/${id}`)
        setEvent(response.data.event)
      } catch (error) {}
    }
    getUserEvents()
  }, [id])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent((event) => ({
      ...event,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${setUrl.getURL()}/events/update`,
        {
          title,
          description,
          location,
          address,
          startEvent,
          endEvent,
        },
        { withCredentials: true }
      )
      setEvent(response.data.event)
      setConfirmationMessage(response.data.message)
    } catch (errors: any) {
      errors.response.data.errors.forEach((errorMessage: any) => {
        setError((error) => ({
          ...error,
          [errorMessage.field]: `${errorMessage.message}`,
        }))
      })
    }
  }
  const { title, description, location, address, startEvent, endEvent } = event
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Update Event
        </h1>
      </div>
      {event && (
        <div key={event.title}>
          <Form formName="Event Form" className="eventForm" onSubmit={(e) => onSubmit(e)}>
            <>
              <div>
                <Label name="Title" title="Title" className="eventLabel" />
              </div>
              <div>
                <Input
                  name="title"
                  className="eventTitle"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <span>{error.title}</span>
              <div>
                <Label name="Description" title="Description" className="descriptionLabel" />
              </div>
              <div>
                <Input
                  name="description"
                  className="eventDescription"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <span>{error.description}</span>
              <div>
                <Label name="Location" title="Location" className="locationLabel" />
              </div>
              <div>
                <Input
                  name="location"
                  className="eventLocation"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <span>{error.location}</span>
              <div>
                <Label name="Address" title="Address" className="addressLabel" />
              </div>
              <div>
                <Input
                  name="address"
                  className="eventAddress"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <span>{error.address}</span>
              <div>
                <Label name="StartEvent" title="StartEvent" className="startEventLabel" />
              </div>
              <div>
                <Input
                  name="startEvent"
                  className="eventStartEvent"
                  placeholder="StartEvent"
                  value={startEvent}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <span>{error.startEvent}</span>
              <div>
                <Label name="EndEvent" title="EndEvent" className="endEventLabel" />
              </div>
              <div>
                <Input
                  name="endEvent"
                  className="eventEndEvent"
                  placeholder="EndEvent"
                  value={endEvent}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <span>{error.endEvent}</span>
              <Button name="Update event" className="eventButton" disabled={false} />
            </>
          </Form>
        </div>
      )}
    </>
  )
}

export default PageWithAuth(UpdatEvent)
