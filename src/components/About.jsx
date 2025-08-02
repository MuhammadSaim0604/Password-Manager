

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">About SecureVault</h1>
          
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              At SecureVault, we believe that security shouldn't be complicated. Our mission is to provide simple, 
              reliable password management that keeps your digital life secure without getting in your way.
            </p>
            <p className="text-gray-700">
              Founded in 2023, we're a small team of security enthusiasts dedicated to making password management 
              accessible to everyone.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Security First</h2>
            <p className="text-gray-700 mb-4">
              We use industry-standard AES-256 encryption to protect your data. Your master password is never stored 
              on our servers, and we never have access to your stored passwords.
            </p>
            <p className="text-gray-700">
              All data is encrypted before it leaves your device, ensuring that even if our servers were compromised, 
              your information would remain secure.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">The Team</h2>
            {/* <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="h-24 w-24 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center text-blue-600 text-2xl font-bold">
                  JD
                </div>
                <h3 className="font-medium">John Doe</h3>
                <p className="text-gray-600 text-sm">Founder & CEO</p>
              </div>
              <div className="text-center">
                <div className="h-24 w-24 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center text-blue-600 text-2xl font-bold">
                  AS
                </div>
                <h3 className="font-medium">Alice Smith</h3>
                <p className="text-gray-600 text-sm">Security Lead</p>
              </div>
              <div className="text-center">
                <div className="h-24 w-24 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center text-blue-600 text-2xl font-bold">
                  RJ
                </div>
                <h3 className="font-medium">Robert Johnson</h3>
                <p className="text-gray-600 text-sm">Lead Developer</p>
              </div>
            </div> */}


            <div className="text-center">
                <div className="h-24 w-24 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center text-blue-600 text-2xl font-bold">
                  <img className="rounded-3xl" src="/saim.jpg" alt="Muhammad Saim" />
                </div>
                <h3 className="font-medium">Muhammad Saim</h3>
                <p className="text-gray-600 text-sm">Founder and Developer</p>
              </div>
          </div>
        </div>
      </main>
    </div>
  );
}