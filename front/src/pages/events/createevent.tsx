import React, { useState } from 'react'
import Form from '@/components/form/form'
import Label from '@/components/label/label'
import Input from '@/components/input/input'
import Button from '@/components/button/button'
import axios from 'axios'
import PageWithAuth from '@/providers/pageWithAuth'
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
      const response = await axios.post(
        `${setUrl.getURL()}/events`,
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
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create Event
        </h1>
      </div>
      {confimationMessage ? (
        <div>{confimationMessage}</div>
      ) : (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form formName="Event Form" className="eventForm space-y-6" onSubmit={(e) => onSubmit(e)}>
            <>
              <div>
                <Label
                  name="Title"
                  title="Title"
                  className="eventLabel block text-sm/6 font-medium text-gray-900"
                />
              </div>
              <div>
                <Input
                  name="title"
                  className="eventTitle block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <span>{error.title}</span>
              <div>
                <Label
                  name="Description"
                  title="Description"
                  className="descriptionLabel block text-sm/6 font-medium text-gray-900"
                />
              </div>
              <div>
                <Input
                  name="description"
                  className="eventDescription block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <span>{error.description}</span>
              <div>
                <Label
                  name="Location"
                  title="Location"
                  className="locationLabel block text-sm/6 font-medium text-gray-900"
                />
              </div>
              <div>
                <Input
                  name="location"
                  className="eventLocation block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <span>{error.location}</span>
              <div>
                <Label
                  name="Address"
                  title="Address"
                  className="addressLabel block text-sm/6 font-medium text-gray-900"
                />
              </div>
              <div>
                <Input
                  name="address"
                  className="eventAddress block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <span>{error.address}</span>
              <div>
                <Label
                  name="StartEvent"
                  title="StartEvent"
                  className="startEventLabel block text-sm/6 font-medium text-gray-900"
                />
              </div>
              <div>
                <Input
                  name="startEvent"
                  className="eventStartEvent block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="StartEvent"
                  value={startEvent}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <span>{error.startEvent}</span>
              <div>
                <Label
                  name="EndEvent"
                  title="EndEvent"
                  className="endEventLabel block text-sm/6 font-medium text-gray-900"
                />
              </div>
              <div>
                <Input
                  name="endEvent"
                  className="eventEndEvent block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="EndEvent"
                  value={endEvent}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <span>{error.endEvent}</span>
              <Button
                name="Create event "
                className="eventButton flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={false}
              />
            </>
          </Form>
        </div>
      )}
    </>
  )
}

export default PageWithAuth(CreateEvent)
