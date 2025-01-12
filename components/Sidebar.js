import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Cloud, Newspaper, DollarSign } from 'lucide-react'

const Sidebar = () => {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Weather', path: '/weather', icon: Cloud },
    { name: 'News', path: '/news', icon: Newspaper },
    { name: 'Finance', path: '/finance', icon: DollarSign },
  ]

  return (
    <aside className="w-64 bg-white shadow-md h-screen">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-6 py-2 mt-1 duration-200 border-l-4 ${
                pathname === item.path
                  ? 'bg-gray-100 border-blue-500 text-blue-500'
                  : 'border-transparent hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar