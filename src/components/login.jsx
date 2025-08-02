import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
    const [authMode, setAuthMode] = useState('login');
    const [email, setEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [name, setName] = useState(''); // Added for signup
    const [error, setError] = useState('');
    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (authMode === 'signup' && !name) {
            setError('Please enter your name');
            return;
        }
        
        if (!email || !authPassword) {
            setError('Please fill all fields');
            return;
        }

        try {
            if (authMode === 'login') {
                await login(email, authPassword);
                navigate('/passwords');
            } else {
                // Include name in signup if available
                await signup(email, authPassword, name);
                navigate('/passwords');
            }
        } catch (err) {
            console.error('Authentication error:', err);
            setError(err.response?.data?.message || 'Authentication failed');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">
                        {authMode === 'login' ? 'Login to SecureVault' : 'Create an Account'}
                    </h1>
                    {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
                    <form onSubmit={handleAuthSubmit}>
                        {authMode === 'signup' && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="John Doe"
                                />
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                value={authPassword}
                                onChange={(e) => setAuthPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder={authMode === 'login' ? 'Enter your password' : 'Create a password (min 8 characters)'}
                                minLength={authMode === 'signup' ? 8 : undefined}
                                required
                            />
                            {authMode === 'signup' && (
                                <p className="mt-1 text-xs text-gray-500">
                                    Use at least 8 characters with a mix of letters, numbers & symbols
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            {authMode === 'login' ? 'Login' : 'Sign Up'}
                        </button>
                    </form>
                    <div className="mt-6 text-center text-sm text-gray-600">
                        {authMode === 'login' ? (
                            <>
                                Don't have an account?{' '}
                                <button
                                    onClick={() => {
                                        setAuthMode('signup');
                                        setError('');
                                    }}
                                    className="text-blue-600 hover:underline font-medium"
                                >
                                    Sign up
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <button
                                    onClick={() => {
                                        setAuthMode('login');
                                        setError('');
                                    }}
                                    className="text-blue-600 hover:underline font-medium"
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </div>
                    {authMode === 'login' && (
                        <div className="mt-4 text-center">
                            <Link to="/forgot-password" className="text-blue-600 hover:underline text-sm">
                                Forgot password?
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Login;