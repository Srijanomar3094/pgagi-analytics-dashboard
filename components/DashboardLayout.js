import React, { useState, useEffect } from "react";
import { FiSun, FiMoon, FiSearch, FiUser } from "react-icons/fi";
import { Home, Cloud, Newspaper, DollarSign } from 'lucide-react';
import { BiLogOut } from "react-icons/bi";

const DashboardLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Apply the dark mode class to the document body
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg sticky top-0 h-screen">
        <div className="p-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            PGAGI Analytics
          </h1>
        </div>

        <nav className="flex flex-col p-4 space-y-4">
          <a href="/" className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-300 transition-all">
            <Home className="mr-3 text-gray-600 dark:text-gray-400" size={20} />
            Dashboard
          </a>

          <a href="/weather" className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-300 transition-all">
            <Cloud className="mr-3 text-gray-600 dark:text-gray-400" size={20} />
            Weather
          </a>

          <a href="/news" className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-300 transition-all">
            <Newspaper className="mr-3 text-gray-600 dark:text-gray-400" size={20} />
            News
          </a>

          <a href="/finance" className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-300 transition-all">
            <DollarSign className="mr-3 text-gray-600 dark:text-gray-400" size={20} />
            Finance
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-700 shadow-md">
          <div className="flex items-center space-x-4">
            {/* Search functionality commented out */}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 bg-gray-300 dark:bg-gray-600 rounded-full"
            >
              {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-600" />}
            </button>
            <div className="relative group">
              <FiUser className="text-gray-600 dark:text-gray-300" size={24} />
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <ul>
                  <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700">Profile</li>
                  <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700">Notifications</li>
                  <li className="p-2 flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                    <BiLogOut />
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4">{children || <div>No content available</div>}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

