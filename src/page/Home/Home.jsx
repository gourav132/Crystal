import React, { useState } from 'react';
import { Upload } from '../../components';
import useDatabase from '../../hooks/useDatabase';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';
import './Home.css'; // Add this for custom styling

export default function Home({ setSelectedImg }) {

  const { docs } = useDatabase('images');

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
      <div>
          <section className="body">
              <h1 className="heading tracking-tighter">A Curated Photo Gallery</h1>
              <p className="sub-heading tracking-tighter">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.</p>
          </section>
          <Upload />
          <section className="gallery mt-8">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column">
              {docs && docs.map((doc) => {
                return (
                  <motion.div 
                    className="w-full rounded-xl p-2 img-wrap" 
                    key={doc.id} 
                    layout
                    onClick={() => setSelectedImg({ url: doc.url, id: doc.id })}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.img 
                      src={doc.url}
                      alt="image"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className='rounded'
                    />
                  </motion.div>
                )
              })}
            </Masonry>
          </section>
      </div>
  );
}
