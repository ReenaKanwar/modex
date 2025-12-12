import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './Contexts/AuthContext';
import { ShowProvider } from './Contexts/ShowContext';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root container not found');

createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ShowProvider>
          <App />
        </ShowProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
