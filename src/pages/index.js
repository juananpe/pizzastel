import Link from 'next/link';
import { ChefHat, UserSquare2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pizzastel</h1>
          <p className="text-gray-600">Select your role to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            href="/cook"
            className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-500"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                <ChefHat size={32} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Cook Interface</h2>
                <p className="text-gray-600">
                  Manage orders, track cooking progress, and handle kitchen operations
                </p>
              </div>
            </div>
          </Link>

          <Link 
            href="/foe"
            className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-green-500"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
                <UserSquare2 size={32} className="text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Front Office</h2>
                <p className="text-gray-600">
                  Handle customer orders, manage verification, and process payments
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
