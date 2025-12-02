import axios from 'axios'
import PageWithAuth from '@/providers/pageWithAuth'
import { useState, useEffect } from 'react'
import { setUrl } from '../../utils/helper'
import { NextPage } from 'next'
import Link from 'next/link'

const Account: NextPage =()=> {
  const [user, setUser] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(`${setUrl.getURL()}/users/account`, { withCredentials: true })
        setUser(response.data.user.username)
      } catch (error) {}
    }
    getUser()
  }, [])
  return (
    <>
      <div  className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>Account Page</h1>
        <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>Name: {user}</h2>
      </div>
      <div>
        <Link className='text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none' href="/events/createevent">
        <a className='text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none'></a>
        CreateEvent</Link>
        <Link href="/events/displayevents">DisplayEvents</Link>
        <Link href="/events/myevents">MyEvents</Link>
        <Link href="/events/attendevents">AttendEvents</Link>
      </div>
    </>
  )
}

export default PageWithAuth(Account)