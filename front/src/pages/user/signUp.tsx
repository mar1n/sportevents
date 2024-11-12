import React, { FC, useState } from "react";
const SignUp: FC = () => {
    const [message, setMessage] = useState(false)

    const register = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setMessage(true)
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
        {message && <p>Check your email please.</p>}
    </div>
    </>
}

export default SignUp;