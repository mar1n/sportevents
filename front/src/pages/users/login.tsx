import Form from '@/components/form/form'
import Label from '@/components/label/label'
import Input from '@/components/input/input'
import Button from '@/components/button/button'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setUrl } from '../../utils/helper'
import axios from 'axios'
export type User = {
  email: string
  password: string
}

export default function Login() {
  const [user, setUser] = useState<User>({ email: '', password: '' })
  const [error, setError] = useState<User & { invalidCredentials: string }>({
    email: '',
    password: '',
    invalidCredentials: '',
  })
  const router = useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((user) => ({
      ...user,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const respons = await axios.post(
        `${setUrl.getURL()}/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      router.push('/users/account')
    } catch (errors: any) {
      errors.response.data.errors.forEach((errorMessage: any) => {
        setError((error) => {
          if (errorMessage.field in error) {
            return { ...error, [errorMessage.field]: `${errorMessage.message}` }
          } else {
            return { ...error, ['invalidCredentials']: `${errorMessage.message}` }
          }
        })
      })
    }
  }
  const { email, password } = user
  return (
    <>
      <div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Login User{' '}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form formName="Login Form" className="space-y-6" onSubmit={(e) => onSubmit(e)}>
            <>
              <div>
                <Label
                  name="email"
                  title="Email"
                  className="block text-sm/6 font-medium text-gray-900"
                />
                <div className="mt-2">
                  <Input
                    name="email"
                    className="block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <span>{error.email}</span>
              </div>
              <div>
                <Label
                  name="password"
                  title="Password"
                  className="block text-sm/6 font-medium text-gray-900"
                />
                <div className="mt-2">
                  <Input
                    name="password"
                    className="block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <span>{error.password}</span>
                <span>{error.invalidCredentials}</span>
              </div>
              <div>
                <Button
                  name="Login Now"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={false}
                />
              </div>
            </>
          </Form>
        </div>
      </div>
    </>
  )
}
