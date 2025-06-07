import React, { useState } from 'react'
import Form from '@/components/form/form'
import Label from '@/components/label/label'
import Input from '@/components/input/input'
import Button from '@/components/button/button'
import axios from 'axios'
import { setUrl } from '../../utils/helper'
export type Event = {
  title: string
  description: string
  location: string
  address: string
  startEvent: string
  endEvent: string
}
function CreateEvent() {
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
  const { title, description, location, address, startEvent, endEvent } = event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent((event) => ({
      ...event,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const respons = await axios.post(`${setUrl.mockSerever}/events`, {
        title,
        description,
        location,
        address,
        startEvent,
        endEvent
      })
      setConfirmationMessage(respons.data.message)
    } catch (errors: any) {
      errors.response.data.errors.forEach((errorMessage: any) => {
        setError((error) => ({
          ...error,
          [errorMessage.field]: `${errorMessage.message}`,
        }))
      })
    }
  }
  return (
    <>
      <div>Create Event</div>
      <div>
        <Form formName="Event Form" className="eventForm" onSubmit={() => 666}>
          <>
            <div>
              <Label name="Title" title="Title" className="eventLabel" />
            </div>
            <div>
              <Input
                name="Title"
                className="eventTitle"
                placeholder="Title"
                value={title}
                onChange={() => console.log()}
              />
            </div>
            <div>
              <Label name="Description" title="Description" className="descriptionLabel" />
            </div>
            <div>
              <Input
                name="Description"
                className="eventDescription"
                placeholder="Description"
                value={description}
                onChange={() => console.log()}
              />
            </div>
            <div>
              <Label name="Location" title="Location" className="locationLabel" />
            </div>
            <div>
              <Input
                name="Location"
                className="eventLocation"
                placeholder="Location"
                value={location}
                onChange={() => console.log()}
              />
            </div>
            <div>
              <Label name="Address" title="Address" className="addressLabel" />
            </div>
            <div>
              <Input
                name="Address"
                className="eventAddress"
                placeholder="Address"
                value={address}
                onChange={() => console.log()}
              />
            </div>
            <div>
              <Label name="StartEvent" title="StartEvent" className="startEventLabel" />
            </div>
            <div>
              <Input
                name="StartEvent"
                className="eventStartEvent"
                placeholder="StartEvent"
                value={startEvent}
                onChange={() => console.log()}
              />
            </div>
            <div>
              <Label name="EndEvent" title="EndEvent" className="endEventLabel" />
            </div>
            <div>
              <Input
                name="endEvent"
                className="eventEndEvent"
                placeholder="EndEvent"
                value={endEvent}
                onChange={() => console.log()}
              />
            </div>
            <Button name="Create event" className="eventButton" disabled={false} />
          </>
        </Form>
      </div>
    </>
  )
}

export default CreateEvent
