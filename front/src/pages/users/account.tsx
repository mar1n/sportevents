import axios from 'axios'
import { useState, useEffect } from 'react'
import { setUrl } from '../../utils/helper'
export default function Account() {
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
    </>
  )
}
