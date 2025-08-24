import { useState } from 'react';
import { Navbar, Modal, CombinedModal} from './components';
import { Home } from './page';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { useCollections } from './contexts/CollectionsContext';

function App() {
  const [ selectedImg, setSelectedImg ] = useState(null);
  const [ showCombinedModal, setShowCombinedModal ] = useState(false);
  const [ editingCollection, setEditingCollection ] = useState(null);
  const { user, isAuthenticated } = useAuth();
  const { uid } = useParams();
  const { fetchCollectionsByUser } = useCollections();

  // Check if the current user is viewing their own gallery
  const isOwnGallery = isAuthenticated && user?.displayName === uid;

  // Function to refresh collections after adding a new image
  const handleImageAdded = async (newImage) => {
    try {
      // Refresh the collections to update image counts
      if (uid) {
        await fetchCollectionsByUser(uid);
      }
    } catch (error) {
      console.error('Error refreshing collections:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar
        isOwnGallery={isOwnGallery}
        showCombinedModal={showCombinedModal}
        setShowCombinedModal={setShowCombinedModal}
      />
      <main className="pt-16">
        <Home 
          setShowCombinedModal={setShowCombinedModal}
          setEditingCollection={setEditingCollection}
        />
      </main>
      <AnimatePresence>
        {selectedImg && <Modal selectedImg = { selectedImg } setSelectedImg = { setSelectedImg } isOwnGallery={isOwnGallery} /> }
      </AnimatePresence>
      <AnimatePresence>
        {showCombinedModal && isOwnGallery && (
          <CombinedModal
            isOpen={showCombinedModal}
            onClose={() => {
              setShowCombinedModal(false);
              setEditingCollection(null);
            }}
            onImageAdded={handleImageAdded}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
