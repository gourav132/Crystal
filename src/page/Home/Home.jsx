import React, { useState } from 'react';
import { Upload } from '../../components';
import useDatabase from '../../hooks/useDatabase';
import { motion } from 'framer-motion';

export default function Home({ setSelectedImg }) {

  const { docs } = useDatabase('images');
  // const [ selectedImg, setSelectedImg ] = useState(null);
  const [ images, setImages ] = useState();



  return (
      <div>
          <section className = "body">
              <h1 className = "heading">A Curated Photo Gallery</h1>
              <p className = "sub-heading">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.</p>
          </section>
          <Upload />
          <section className = "gallery mt-8 grid grid-cols-3">
            { docs && docs.map((doc) => {
              return(
                  <motion.div 
                    className = "w-full rounded-xl p-2 img-wrap" 
                    key = { doc.id } 
                    layout
                    onClick = {() => setSelectedImg({url: doc.url, id: doc.id})}
                    whileHover = {{ opacity: 1}}
                  >
                    <motion.img 
                      src= { doc.url }
                      alt="image"
                      initial = {{ opacity: 0 }}
                      animate = {{ opacity: 1 }}
                      transition = {{ delay: 1 }}
                    />
                  </motion.div>
                )
              })
            }

          </section>
      </div>
  )
}
