import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
//import { parseCookies } from 'nookies'
import axios from 'axios'
import { setUrl } from 'utils/helper'
const PageWithAuth = (Component: NextPage) => {
  const AuthenticatedComponent = () => {
    const router = useRouter()

    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
      const getUser = async () => {
        try {
          const respons = await axios.get(`${setUrl.getURL()}/auth`, { withCredentials: true })
          setIsAuth(true)
        } catch (errors: any) {
          setIsAuth(false)
        }
      }
      getUser()
    }, [])

    return !!isAuth ? <Component /> : <div> Please login to have access to page. </div>
  }

  return AuthenticatedComponent
}

export default PageWithAuth
