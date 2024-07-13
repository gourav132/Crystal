import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../Firebase/config'
import { useNavigate } from 'react-router-dom';

export default function Loading() {
    const [ user, loading ] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if(!loading) {
            if(user) navigate(`/Gallery/${user.displayName}`);
            // else navigate('/Auth');
        }
    }, [user, navigate, loading])
  return (
    <div className='h-screen w-full flex items-center justify-center absolute top-0 bg-gray-900/10'>
        <p className='text-xl font-semibold text-primary'>Loading...</p>
    </div>
  )
}