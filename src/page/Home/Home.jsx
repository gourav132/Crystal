import React, { useEffect, useState } from 'react';
import { Upload } from '../../components';
import useDatabase from '../../hooks/useDatabase';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';
import './Home.css';
import { database } from '../../Firebase/config';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function Home({ setSelectedImg }) {

  const { uid } = useParams();

  const { docs } = useDatabase('images', uid);
  const [ userData, setUserData ] = useState();
  const [load, setLoad ] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoad(true);
    const checkUidInFirestore = async () => {
      if (!uid) {
          console.log("Invalid UID in URL.");
          return;
      }
      try {
          const userSnapshot = await database.collection('users').doc(uid).get();
          if (userSnapshot.exists) {
            setUserData(userSnapshot.data());
          } else {
            navigate("/Error")
          }
          setLoad(false);
      } catch (error) {
          console.error("Error checking UID in Firestore:", error);
      }
  };
      checkUidInFirestore();
  }, [navigate, uid]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
      <div>
        {load ? <Loading /> : 
        <div>
          <section className="body">
              <h1 className="text-4xl tracking-tighter mb-5 text-primary">{userData.title}</h1>
              <p className="tracking-tighter font-medium text-secondary">{userData.description}</p>
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
          </div >
        }
      </div>
  );
}
