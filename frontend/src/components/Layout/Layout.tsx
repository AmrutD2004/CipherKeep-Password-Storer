import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Inappnavbar from './Inappnavbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  // Default to false to avoid SSR hydration mismatch
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    // Set initial state after mount based on viewport width
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768) // md breakpoint
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Helper toggle to prevent direct setter misuse in navbar
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev)

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Overlay Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r z-40 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar />
      </aside>

      {/* Main Content Wrapper */}
      <div className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : ''}`}>
        
        {/* Navbar */}
        <header
          className={`fixed top-0 z-30 h-16 bg-white border-b transition-all duration-300
            ${isSidebarOpen ? 'left-0 md:left-64 md:w-[calc(100%-16rem)]' : 'left-0 w-full'}
          `}
        >
          <Inappnavbar
            setIssidebaropen={toggleSidebar}
            isSideBarOpen={isSidebarOpen}
          />
        </header>

        {/* Scrollable Content */}
        <main className="mt-16 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout