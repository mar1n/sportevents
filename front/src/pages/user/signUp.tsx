const SignUp = () => {
    return <>
    <div>
        <h1>Sign Up Page</h1>
        <form aria-label="signUp">
            <input placeholder="emailSignUp" type="email" />
            <input placeholder="passwordSignUp" type="password" />
            <button aria-label="signUp">
                Register
            </button>
        </form>
    </div>
    </>
}

export default SignUp;