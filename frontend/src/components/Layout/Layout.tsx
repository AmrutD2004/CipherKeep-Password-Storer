import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Inappnavbar from './Inappnavbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSideBarOpen, setIssidebaropen] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIssidebaropen(false)
      } else {
        setIssidebaropen(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="h-screen flex">

      {/* Sidebar */}
      {isSideBarOpen && (
        <div className="fixed left-0 top-0 h-full w-64 z-40 bg-white border-r">
          <Sidebar />
        </div>
      )}

      {/* Right Section */}
      <div className={`flex flex-col flex-1 ${isSideBarOpen ? 'ml-64' : ''}`}>

        {/* Navbar */}
        <div
          className={`fixed top-0 h-16 z-30 bg-white border-b transition-all duration-300
          ${isSideBarOpen ? 'left-64 w-[calc(100%-16rem)]' : 'left-0 w-full'}`}
        >
          <Inappnavbar
            setIssidebaropen={setIssidebaropen}
            isSideBarOpen={isSideBarOpen}
          />
        </div>

        {/* Scrollable Content */}
        <main className="mt-16 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>

      </div>
    </div>
  )
}

export default Layout