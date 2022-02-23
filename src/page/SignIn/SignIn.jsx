import React from 'react'

export default function SignIn() {
    return (
        <div className='login-wrapper grid grid-cols-3'>
            <div className='login-forms col-span-2 grid items-center'>
                <div className=''>
                    <h1 className='login-heading'>Crystal.com</h1>
                    <h3 className='login-sub-heading'>A Curated Photo <br /> Gallery</h3>
                    <div className='form grid grid-cols-1'>
                        <p className='login-form-heading'>Sigin with your Crystal account to add photos to your gallery</p>
                        <input className='input' type="text" placeholder='Enter email'/>
                        <input className='input' type="text" placeholder='Enter password'/>
                        {/* <input type="checkbox" /> Remenber me */}
                        <button className='login-button'>LOGIN</button>
                    </div>
                </div>
            </div>
            <div className='login-picture grid justify-items-center items-center'>
                <img 
                    className='picture' 
                    src="https://images.unsplash.com/photo-1580707221190-bd94d9087b7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" 
                    alt="" />
            </div>
        </div>
    )
}
