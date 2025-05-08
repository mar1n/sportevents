import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { parseCookies } from 'nookies'

const PageWithAuth = (Component: NextPage) => {
  const AuthenticatedComponent = () => {
    const router = useRouter()

    const cookies = parseCookies()
    const isAuthenticated = !cookies.isAuthenticated ? false : cookies.isAuthenticated

    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
      const getUser = async () => {
        if (!isAuthenticated) {
          setIsAuth(false)
        } else {
          setIsAuth(true)
        }
      }
      getUser()
    }, [isAuthenticated])

    return !!isAuth ? <Component /> : <div> Please login to have access to page. </div> // Render whatever you want while the authentication occurs
  }

  return AuthenticatedComponent
}

export default PageWithAuth
