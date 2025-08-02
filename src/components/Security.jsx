import { useAuth } from '../context/AuthContext';

export default function Security() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Security Settings</h1>
          
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-6">Account Security</h2>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-gray-600 text-sm">Add an extra layer of security to your account</p>
                </div>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm">
                  Enable
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Password Change</h3>
                  <p className="text-gray-600 text-sm">Last changed 3 months ago</p>
                </div>
                <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 text-sm">
                  Change Password
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Active Sessions</h3>
                  <p className="text-gray-600 text-sm">2 active sessions</p>
                </div>
                <button className="text-blue-600 hover:underline text-sm">
                  View Sessions
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Security Audit</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Strong Master Password</h3>
                  <p className="text-gray-600 text-sm">Your master password is secure</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                  <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">2 Reused Passwords</h3>
                  <p className="text-gray-600 text-sm">Consider updating these for better security</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                  <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">5 Weak Passwords</h3>
                  <p className="text-gray-600 text-sm">These passwords could be easily guessed</p>
                </div>
              </div>
            </div>

            <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Run Full Security Audit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}