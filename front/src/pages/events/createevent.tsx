import React from 'react'
import Form from '@/components/form/form'
import Label from '@/components/label/label'
import Input from '@/components/input/input'
import Button from '@/components/button/button'
function CreateEvent() {
  return (
    <>
      <div>Create Event</div>
      <div>
        <Form formName="Event Form" className="eventForm" onSubmit={() => console.log()}>
          <>
            <div>
              <Label name="Title" title="Title" className="eventLabel" />
            </div>
            <div>
              <Input
                name="Title"
                className="eventTitle"
                placeholder="Title"
                value=""
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
                value=""
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
                value=""
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
                value=""
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
                value=""
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
                value=""
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
