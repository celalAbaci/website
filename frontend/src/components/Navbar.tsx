"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout, userEmail } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center text-xl font-bold text-primary">
              ERKA
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-700 hover:text-primary">
              Products
            </Link>
            {isAuthenticated ? (
              <>
                 <span className="text-sm text-gray-500">{userEmail}</span>
                 <Link href="/admin" className="text-gray-700 hover:text-primary">
                   Admin
                 </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-primary">
                  Login
                </Link>
                <Link href="/register" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
