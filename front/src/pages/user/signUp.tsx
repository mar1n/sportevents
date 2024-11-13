import React, { useState } from "react";
function SignUp  ()  {
    const [message, setMessage] = useState('')

    const register = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:3001/register`)

        if (response.ok) {
          const body = await response.json()
          setMessage(body.message)
        }
        } catch(error) {
            console.log('error', error)
            setMessage('')
        }
    }
    return <>
    <div>
        <h1>Sign Up Page</h1>
        <form aria-label="signUp">
            <input placeholder="emailSignUp" type="email" />
            <input placeholder="passwordSignUp" type="password" />
            <button aria-label="signUp" onClick={(e) => register(e)}>
                Register
            </button>
        </form>
        {message && <p>{message}</p>}
    </div>
    </>
}

export default SignUp;