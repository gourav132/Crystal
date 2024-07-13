import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { auth, database, timestamp } from '../../Firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function UploadModal({ setAddImage, setError, setFile }) {

    const [ url, setUrl ] = useState(null);
    const [ user ] = useAuthState(auth);
    const types = ['image/png', 'image/jpeg'];

    const handleChange = (e) => {
        const selected = e.target.files[0];
        if(selected && types.includes(selected.type)){
            setFile(selected)
            setAddImage(null)
            setError(null)
        } else {
            setFile(null);
            setError("Please select an image file (png or jpeg)")
            setAddImage(null)
        }
    }

    const handleURL = () => {
        const collectionRef = database.collection('images');
        if(validateURL(url)){
            setAddImage(null);
            const createdAt = timestamp();
            collectionRef.add({ url, createdAt, user: user.displayName })
            .then( resp => {
                // console.log(resp);
                setUrl(null)
            })
            .catch( error => {
                console.log(error);
            })
        } else {
            setAddImage(null);
            setError("Please enter a valid url")
        }
    }

    const validateURL = (url) => {
        var pattern = new RegExp('^(https?:\\/\\/)?'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i');
        return pattern.test(url);
    }

    const handleClick = (e) => {
        // console.log(e.target.classList)
        if(e.target.classList.contains('backdrop') || e.target.classList.contains('upload-wrapper')){
            setAddImage(null);
        }
    }
    return (
        <motion.div 
            className='backdrop' 
            initial = {{ opacity: 0 }} 
            animate = {{ opacity: 1 }} 
            exit = {{ opacity: 0 }}
            onClick = { handleClick }>
            <div className='upload-wrapper grid grid-cols-1 md:grid-cols-2 justify-items-center content-center'>

                <motion.div 
                    initial = {{ y: '-100vh' }}
                    animate = {{ y: 0}} 
                    transition={{ delay: 0.1}}
                    className="upload-option-1 grid grid-cols-1 justify-items-center content-center"
                >
                    <h3>Select an image</h3>
                    <p>Simply select your image from your computer. Just keep in mind to choose a jpg or png file when uploading.</p>

                    <motion.label 
                        // whileHover={{ scale: 1.1 }} 
                        className='bg-primary mt-5 text-sm text-white px-4 py-2 rounded hover:bg-primary/90 cursor-pointer' 
                        htmlFor="inputFile"
                    >
                        <div className='transition-all'>
                            Select an image
                        </div>  
                    </motion.label> 

                    <input className = "hidden" id = "inputFile" type="file" onChange={ handleChange }/>

                </motion.div>

                <motion.div 
                    initial = {{ y: '-100vh' }} 
                    animate = {{ y: 0}} 
                    transition={{ delay: 0.2}} 
                    className="upload-option-2 grid grid-cols-1 justify-items-center content-center"
                >
                    <h3>Paste image url</h3>
                    <p>You can upload images from another website without downloading them, simply paste the image link here and we will handle it</p>

                    <input 
                        type="text"
                        placeholder='Past your link here' 
                        className='mt-3 text-sm border-2 border-primary/80 rounded px-2 py-2 bg-transparent focus:outline-none' 
                        onChange={ (e) => setUrl(e.target.value)}
                    />

                    <motion.button 
                        whileHover={{ scale: 1.1 }} 
                        className='bg-primary mt-2 w-44 text-sm text-white px-4 py-2 rounded hover:bg-primary/90 cursor-pointer' 
                        onClick={ handleURL }
                    >
                        + Add Image
                    </motion.button>
                    
                </motion.div>

            </div>
        </motion.div>
    )
}
