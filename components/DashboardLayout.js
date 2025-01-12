import React from 'react'
import Sidebar from './Sidebar'

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-400">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout