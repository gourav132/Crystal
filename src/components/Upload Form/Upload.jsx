import React, { useState } from 'react'
import Progress from '../Progress Bar/Progress'
import UploadModal from '../Upload Modal/UploadModal';
import { AnimatePresence } from 'framer-motion';

export default function Upload() {
    
    const [ file, setFile ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ addImage, setAddImage ] = useState(false);

    return (
        <>
        <AnimatePresence>
            { addImage && 
                <UploadModal 
                    setAddImage = { setAddImage }
                    setError = { setError }
                    setFile = { setFile }
                /> 
            }
        </AnimatePresence>
        <div className = "upload">
            <button className='add-image-button' onClick={ () => setAddImage(true) }>+</button>
            <div className='output text-center'>
                { error && <div className = "error">{ error }</div> }
                { file && <div className = "fileName">{ file.name }</div> }
                { file && <Progress file = { file } setFile = { setFile } /> }
            </div>

        </div>
        </>
    )
}
