import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../Firebase/config'
import { useNavigate, useParams } from 'react-router-dom';

export default function Loading() {
    const [ user, loading ] = useAuthState(auth);
    const navigate = useNavigate();
    const { uid } = useParams();
    useEffect(() => {
        if(!loading && !uid) {
            if(user) navigate(`/Gallery/${user.displayName}`);
            else navigate('/Auth');
        }
    }, [user, navigate, loading, uid])
  return (
    <div className='h-screen w-full flex items-center justify-center absolute top-0 bg-gray-900/10'>
        <p className='text-xl font-semibold text-primary'>Loading...</p>
    </div>
  )
}