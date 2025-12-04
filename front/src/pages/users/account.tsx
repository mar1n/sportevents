import axios from 'axios'
import PageWithAuth from '@/providers/pageWithAuth'
import { useState, useEffect } from 'react'
import { setUrl } from '../../utils/helper'
import { NextPage } from 'next'
import Link from 'next/link'

const Account: NextPage = () => {
  const [user, setUser] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(`${setUrl.getURL()}/users/account`, {
          withCredentials: true,
        })
        setUser(response.data.user.username)
      } catch (error) {}
    }
    getUser()
  }, [])
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Account Page
        </h1>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Name: {user}
        </h2>
      </div>
      <div className="mt-8 w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 place-items-center">
          <Link
            className="w-full sm:w-auto md:w-fit text-center text-white bg-brand border border-transparent 
                 hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs 
                 font-medium leading-5 rounded-base text-sm px-4 py-2.5"
            href="/events/createevent"
          >
            CreateEvent
          </Link>
          <Link
            className="w-full sm:w-auto md:w-fit text-center text-white bg-brand border border-transparent 
                 hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs 
                 font-medium leading-5 rounded-base text-sm px-4 py-2.5"
            href="/events/displayevents"
          >
            DisplayEvents
          </Link>
          <Link
            className="w-full sm:w-auto md:w-fit text-center text-white bg-brand border border-transparent 
                 hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs 
                 font-medium leading-5 rounded-base text-sm px-4 py-2.5"
            href="/events/myevents"
          >
            MyEvents
          </Link>
          <Link
            className="w-full sm:w-auto md:w-fit text-center text-white bg-brand border border-transparent 
                 hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs 
                 font-medium leading-5 rounded-base text-sm px-4 py-2.5"
            href="/events/attendevents"
          >
            AttendEvents
          </Link>
        </div>
      </div>
    </>
  )
}

export default PageWithAuth(Account)
