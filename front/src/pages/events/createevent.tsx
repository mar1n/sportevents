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
            <Button name="Create event" className="eventButton" disabled={false} />
          </>
        </Form>
      </div>
    </>
  )
}

export default CreateEvent
