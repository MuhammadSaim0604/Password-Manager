import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { router } from './routes';
import Navbar from './components/navbar';
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
        {({ location }) => (
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <router.RouterProvider router={router} location={location} />
            </main>
          </div>
        )}
      </RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);