import { HttpResponse } from 'msw'
const registerResponses = {
  allValidationFails: () => {
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
  allValidationFails: () => {
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
}
export { registerResponses, loginResponses }
