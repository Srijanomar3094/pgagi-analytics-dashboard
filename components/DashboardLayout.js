import React, { useState, useEffect } from "react";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import { Home, Cloud, Newspaper, DollarSign } from "lucide-react";
import { BiLogOut } from "react-icons/bi";

const DashboardLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Apply the dark mode class to the document body
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-700 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-2xl sticky top-0 h-screen">
        <div className="p-6 text-center border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            PGAGI<span className="text-blue-500"> Analytics</span>
          </h1>
        </div>

        <nav className="flex flex-col mt-6 space-y-6 p-6 ml-1">
          {[
            { label: "Dashboard", href: "/", icon: <Home size={28} /> },
            { label: "Weather", href: "/weather", icon: <Cloud size={28} /> },
            { label: "News", href: "/news", icon: <Newspaper size={28} /> },
            { label: "Finance", href: "/finance", icon: <DollarSign size={28} /> },
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300 transition-all"
            >
              <span className="mr-4 text-gray-500 dark:text-gray-400">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Welcome Back !!
            </h2>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-all"
            >
              {darkMode ? (
                <FiSun className="text-yellow-400" size={24} />
              ) : (
                <FiMoon className="text-gray-600" size={24} />
              )}
            </button>
            <div className="relative group">
  <FiUser className="text-gray-600 dark:text-gray-300" size={28} />
  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
    <ul>
      <li className="p-3 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700 transition-all">
        Profile
      </li>
      <li className="p-3 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700 transition-all">
        Notifications
      </li>
      <li className="p-3 flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700 transition-all">
        <BiLogOut className="text-gray-800 dark:text-gray-200" />
        <span>Logout</span>
      </li>
    </ul>
  </div>
</div>

          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg m-6 flex-grow">
          {children || (
            <div className="text-gray-700 dark:text-gray-300 text-center">
              No content available
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
