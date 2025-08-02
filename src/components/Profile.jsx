import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';


export default function Profile() {
  const { user, setUser } = useAuth();
  const [fullName, setFullName] = useState(user?.name || '');
  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const d = await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/profile`, { name: fullName }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (d.status === 200) {
        setUser({ ...user, name: d.data.user.name });
        setFullName(d.data.name);
      }

      setMessage('Profile updated successfully.');
    } catch (err) {
      console.error('Profile update failed:', err);
      setMessage('Failed to update profile.');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/delete-account`, {
          headers: { Authorization: `Bearer ${token}` }
        }
        );
        if (response.status === 200) {
          alert(`${response.data.message}`);
          setUser(null); // Clear user state
          localStorage.removeItem('token'); // Remove token from local storage
          window.location.href = '/'; // Redirect to home page
        }
      } catch (err) {
        console.error('Account deletion failed:', err);
      }
    }
  }

  const handleExportData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/export-data`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob' // Important for file download
      });

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: 'application/json' });

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'exported_data.json'; // Same as server filename or your custom name
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export data.');
    }
  };


  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-grow bg-gray-50">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Profile</h1>

          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <div className="flex items-center mb-6">
              <div className="h-16 w-16 rounded-full bg-blue-400 flex items-center justify-center text-white text-2xl font-bold mr-4">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user?.name || 'User'}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>

            {message && (
              <div className="mb-4 p-3 rounded-md text-sm bg-blue-100 text-blue-700">
                {message}
              </div>
            )}


            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                {/* <input
                  type="text"
                  defaultValue={user?.name || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                /> */}

                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />

              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subscription Plan</label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-blue-100 text-blue-800 rounded-md text-sm mr-3">Free</span>
                  <button className="text-blue-600 hover:underline text-sm">Upgrade Plan</button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Danger Zone</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Export Data</h3>
                  <p className="text-gray-600 text-sm">Download all your passwords in a secure format</p>
                </div>
                <button
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 text-sm"
                  onClick={handleExportData}
                >
                  Export
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Delete Account</h3>
                  <p className="text-gray-600 text-sm">Permanently delete your account and all data</p>
                </div>
                <button
                  className="bg-red-100 text-red-600 py-2 px-4 rounded-md hover:bg-red-200 text-sm"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}