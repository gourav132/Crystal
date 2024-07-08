import React from 'react'

export default function SignIn() {
    return (
        <div className='w-full h-screen grid grid-cols-3 items-center justify-around relative'>
            <div className='col-span-2 flex flex-col items-center'>
                    <h1 className='text-xl absolute top-4 left-6 font-semibold tracking-wider'>Crystal</h1>
                    <h3 className='text-2xl font-semibold'>A Curated Photo Gallery</h3>
                    <p className='font-semibold text-sm text-gray-600'>Sigin with your Crystal account to add photos to your gallery</p>
                    <form className='mt-8'>
                        <div>
                            <label htmlFor="email" className='block text-sm font-semibold text-gray-700'>Email address</label>
                            <input id="email" className='border py-2 px-2 w-96 rounded-md shadow-sm mt-1' type="text" placeholder='Enter email'/>
                        </div>

                        <div className='mt-3'>
                            <label className='block text-sm font-semibold text-gray-700' htmlFor="password">Password</label>
                            <input id='password' className='border py-2 px-2 w-96 rounded shadow-sm mt-1' type="password" placeholder='Enter password'/>
                        </div>
                        <p className='text-sm font-semibold text-indigo-500 mt-1 flex justify-end'>Forgot password?</p>
                        <button className='mt-4 w-96 bg-indigo-500 hover:bg-indigo-600 py-2 px-6 rounded-md shadow-lg  font-semibold text-white text-sm'>LOGIN</button>
                        <p className='text-sm font-semibold text-gray-700 mt-4 text-center'>Don't have an account? <span className='text-indigo-500'>Create now</span></p>
                    </form>
            </div>
            <div className=''>
                <img 
                    className='w-full h-screen' 
                    // src="https://images.unsplash.com/photo-1580707221190-bd94d9087b7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" 
                    src="https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="" />
            </div>
        </div>
    )
}
