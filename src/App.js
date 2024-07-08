import { useState } from 'react';
import { Navbar, Modal} from './components';
import { Home } from './page';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [ selectedImg, setSelectedImg ] = useState(null);

  return (
    <div>
      <Navbar />
      <Home setSelectedImg = { setSelectedImg } />
      <AnimatePresence>
        {selectedImg && <Modal selectedImg = { selectedImg } setSelectedImg = { setSelectedImg } /> }
      </AnimatePresence>
    </div>
  );
}

export default App;
