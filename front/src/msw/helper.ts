import { HttpResponse } from 'msw'
const eventsResponses = {
  allInputsFieldsAreEmpty: () => {
    throw HttpResponse.json(
      {
        errors: [
          {
            message: 'The title field must be defined',
            rule: 'required',
            field: 'title',
          },
          {
            message: 'The description field must be defined',
            rule: 'required',
            field: 'description',
          },
          {
            message: 'The location field must be defined',
            rule: 'required',
            field: 'location',
          },
          {
            message: 'The address field must be defined',
            rule: 'required',
            field: 'address',
          },
          {
            message: 'The startEvent field must be defined',
            rule: 'required',
            field: 'startEvent',
          },
          {
            message: 'The endEvent field must be defined',
            rule: 'required',
            field: 'endEvent',
          },
        ],
      },
      { status: 422 }
    )
  },
}
const registerResponses = {
  allInputsFieldsAreEmpty: () => {
    throw HttpResponse.json(
      {
        errors: [
          {
            message: 'The username field must be defined',
            rule: 'required',
            field: 'username',
          },
          {
            message: 'The email field must be defined',
            rule: 'required',
            field: 'email',
          },
          {
            message: 'The password field must be defined',
            rule: 'required',
            field: 'password',
          },
        ],
      },
      { status: 422 }
    )
  },
  invalidEmail: () => {
    throw HttpResponse.json(
      {
        errors: [
          {
            message: 'The email field must be a valid email address',
            rule: 'required',
            field: 'email',
          },
        ],
      },
      { status: 422 }
    )
  },
  invalidPasswordLength: () => {
    throw HttpResponse.json(
      {
        errors: [
          {
            message: 'The password field must have at least 8 characters',
            rule: 'required',
            field: 'password',
          },
        ],
      },
      { status: 422 }
    )
  },
}

const loginResponses = {
  allInputsFieldsAreEmpty: () => {
    throw HttpResponse.json(
      {
        errors: [
          {
            message: 'The username field must be defined',
            rule: 'required',
            field: 'username',
          },
          {
            message: 'The password field must be defined',
            rule: 'required',
            field: 'password',
          },
        ],
      },
      { status: 422 }
    )
  },
  invaldiCredentials: () => {
    throw HttpResponse.json(
      {
        errors: [
          {
            message: 'Invalid user credentials',
          },
        ],
      },
      { status: 400 }
    )
  },
}
export { registerResponses, loginResponses, eventsResponses }
