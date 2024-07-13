import React, { useEffect, useState } from 'react'
import Login from '../Login/Login'
import Register from '../Register/Register'
import ForgotPassword from '../Forgot Password/ForgotPassword'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../Firebase/config'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const [mode, setMode] = useState("login");
    const [ user, loading, error ] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(!loading) {
            if(user) navigate(`/Gallery/${user.displayName}`);
        }
    }, [user, navigate, loading]);

    return (
        <div className='w-full h-screen flex md:grid md:grid-cols-3 items-center justify-around relative'>
            <h1 className='text-xl absolute top-4 left-6 font-semibold tracking-normal text-primary'>Crystal</h1>
            <div className='md:col-span-2 flex justify-center items-center'>
                {mode === "login" && <Login setMode={setMode} />}
                {mode === "register" && <Register setMode={setMode} /> }
                {mode === "FP" && <ForgotPassword setMode={setMode} /> }
                
            </div>
            <div className='hidden md:block'>
                <img 
                    className='w-full h-screen' 
                    src="https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="" />
            </div>
        </div>
    )
}
