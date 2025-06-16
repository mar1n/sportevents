import axios from 'axios'
import PageWithAuth from '../../components/providers/pageWithAuth'
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
        const respons = await axios.get(`${setUrl.mockSerever}/users/account`)
        setUser(respons.data.user)
      } catch (err) {}
    }
    getUser()
  }, [])
  return (
    <>
      <div>
        <h1>Account Page</h1>
        <h2>Name: {user}</h2>
      </div>
      <div>
        <Link href="/events/createevent">CreateEvent</Link>
      </div>
    </>
  )
}

export default PageWithAuth(Account)