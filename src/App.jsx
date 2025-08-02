import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/navbar'; // adjust path if needed

export default function App() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
