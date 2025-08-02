

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h1>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="your@email.com"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            <a href="/login" className="text-blue-600 hover:underline">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}