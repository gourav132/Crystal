import React from 'react'
import { motion } from 'framer-motion';

export default function Modal({ selectedImg, setSelectedImg }) {
    const handleClick = (e) => {
        if(e.target.classList.contains('backdrop')){
            setSelectedImg(null);
        }
    }

    return (
        <motion.div 
            initial = {{ opacity: 0}}
            animate = {{ opacity: 1 }} 
            exit = {{ opacity: 0}}
            className='backdrop absolute top-0 bottom-0 ' 
            onClick={ handleClick }
            key = { selectedImg.id }
        >
                <motion.img 
                    key = { selectedImg.id } 
                    initial = {{ y: '-100vh' }}
                    animate = {{ y: 0}}  
                    exit = {{ y: '-100vh'}}
                    src = { selectedImg.url } 
                    alt="Enlarged image"
                />
        </motion.div>
    )
}
