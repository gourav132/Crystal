import React from 'react'
import { motion } from 'framer-motion';
import { BiTrash } from 'react-icons/bi';
import { database } from '../../Firebase/config';

export default function Modal({ selectedImg, setSelectedImg }) {
    const handleClick = (e) => {
        if(e.target.classList.contains('backdrop')){
            setSelectedImg(null);
        }
    }

    const handleDeleteIMG = async () => {
        try {
            await database.collection('images').doc(selectedImg.id).delete();
            console.log("Image deleted");
            setSelectedImg(null);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <motion.div 
            initial = {{ opacity: 0}}
            animate = {{ opacity: 1 }} 
            exit = {{ opacity: 0}}
            className='backdrop absolute top-0 bottom-0' 
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
                <div>
                    <button onClick={handleDeleteIMG} className='bg-red-500 absolute top-10 right-32 shadow-lg hover:bg-red-600 text-xl px-2 py-2 rounded-full'><BiTrash /></button>
                </div>
        </motion.div>
    )
}
