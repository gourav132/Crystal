import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './index.css'
import Home from './page/Auth/Home/Home';
import { Loading, Profile, Landing, About, CollectionDetail } from './page';
import NotFound from './page/Error/NotFound';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { CollectionsProvider } from './contexts/CollectionsContext';
import { ProtectedRoute, PublicRoute } from './components';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <CollectionsProvider>
          <Router>
            <Routes>
                                  {/* Public routes - accessible to everyone */}
                      <Route path='/' element={<Landing />} />
                      <Route path="/Gallery/:uid" element={<App />} />
                      <Route path="/Gallery/:uid/collection/:collectionId" element={<CollectionDetail />} />
                      <Route path='/About' element={<About />} />
                      <Route path='/Error' element={<NotFound />} />
              
              {/* Auth routes - redirect authenticated users */}
              <Route path="/Auth" element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              } />
              
              {/* Protected routes - require authentication */}
              <Route path='/Profile' element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </CollectionsProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
