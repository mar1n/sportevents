import { HttpResponse } from 'msw'
import { User } from '../pages/users/register'
function registerValidation(user: User) {
  if (!user.username.length && !user.email.length && !user.password.length) {
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
  }
  if (user.username && user.email === 'szymondawidowiczfastmail.com' && user.password) {
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
  }
  if (user.username && user.email && user.password.length < 8) {
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
  }
}

export { registerValidation }
