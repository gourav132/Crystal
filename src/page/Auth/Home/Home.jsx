import React, { useState } from 'react'
import Login from '../Login/Login'
import Register from '../Register/Register'
import ForgotPassword from '../Forgot Password/ForgotPassword'

export default function Home() {
    const [mode, setMode] = useState("login");

    return (
        <div>
            {mode === "login" && <Login setMode={setMode} />}
            {mode === "register" && <Register setMode={setMode} /> }
            {mode === "FP" && <ForgotPassword setMode={setMode} /> }
        </div>
    )
}
