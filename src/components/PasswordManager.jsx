import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from './navbar'; // adjust path if needed

import axios from 'axios';

export default function PasswordManager() {
  const { user, logout } = useAuth();
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [credentials, setCredentials] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  // Filter credentials based on search term
    const filteredCredentials = credentials.filter(cred => 
      cred.url?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      cred.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    useEffect(() => {
      if (user) {
        const fetchPasswords = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/passwords`);
            setCredentials(response.data);
          } catch (err) {
            console.error('Error fetching passwords:', err);
            setError('Failed to fetch credentials');
          }
        };
        fetchPasswords();
      }
    }, [user]);
  
    const cancelEdit = () => {
      setEditingId(null);
      setUrl('');
      setUsername('');
      setPassword('');
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      if (!url || !username || !password) {
        setError('Please fill all fields');
        return;
      }
  
      try {
        if (editingId) {
          const response = await axios.put(`http://localhost:5000/api/passwords/${editingId}`, {
            url,
            username,
            password
          });
          setCredentials(credentials.map(cred => 
            cred._id === editingId ? response.data : cred
          ));
          setEditingId(null);
        } else {
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/passwords`, {
            url,
            username,
            password
          });
          setCredentials([...credentials, response.data]);
        }
        
        setUrl('');
        setUsername('');
        setPassword('');
      } catch (err) {
        console.error('Error saving password:', err);
        setError('Failed to save credentials');
      }
    };
  
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/api/passwords/${id}`);
        setCredentials(credentials.filter(cred => cred._id !== id));
      } catch (err) {
        console.error('Error deleting password:', err);
        setError('Failed to delete credential');
      }
    };
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
  
    return (
      <>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-gray-50">
  
        <div className="max-w-6xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Password Manager</h1>
          
          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
  
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search credentials..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add/Edit Credential Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {editingId ? 'Edit Credentials' : 'Add New Credentials'}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                        <input
                          type="url"
                          id="url"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://example.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Email/Username</label>
                        <input
                          type="text"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="user@example.com or username"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex space-x-3">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        {editingId ? 'Update' : 'Save'} Credentials
                      </button>
                      {editingId && (
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
  
            {/* Saved Credentials */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Saved Credentials</h2>
                  
                  {filteredCredentials.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      {searchTerm ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p>No credentials found matching your search.</p>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <p>No credentials saved yet. Add some above!</p>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email/Username</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredCredentials.map((cred) => (
                            <tr key={cred._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    {cred.url && (
                                      <img 
                                        src={`https://www.google.com/s2/favicons?domain=${cred.url}`} 
                                        alt="" 
                                        className="h-6 w-6"
                                      />
                                    )}
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {cred.url?.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      <a href={cred.url?.startsWith('http') ? cred.url : `https://${cred.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        Visit
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{cred.username}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {showPassword ? cred.password : '••••••••'}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex space-x-3">
                                  <button
                                    onClick={() => {
                                      setEditingId(cred._id);
                                      setUrl(cred.url);
                                      setUsername(cred.username);
                                      setPassword(cred.password);
                                    }}
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDelete(cred._id)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }