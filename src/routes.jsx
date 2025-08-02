import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import PasswordManager from './components/PasswordManager';
import Login from './components/login';
import Features from './components/Features';
import Pricing from './components/Pricing';
import About from './components/About';
import Security from './components/Security';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // This now renders the Outlet
    children: [
      {
        index: true,
        element: <Navigate to="/passwords" replace />,
      },
      {
        path: "passwords",
        element: <PasswordManager />,
      },
      {
        path: "security",
        element: <Security />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "/features",
        element: <Features />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

]);