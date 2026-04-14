import React, { useContext, useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, LogOut, Search, User } from 'lucide-react'
import { AuthContext } from '@/context/authContext'
import { Link } from 'react-router-dom'

type Props = {
  setIssidebaropen: any
  isSideBarOpen: boolean
}

const Inappnavbar = ({ setIssidebaropen, isSideBarOpen }: Props) => {
  const { userPic, userInfo, userLogout } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [imageError, setImageError] = useState(false)

  const getUserInitials = () => {
    if (userInfo?.firstname && userInfo?.lastname) {
      return `${userInfo.firstname[0]}${userInfo.lastname[0]}`.toUpperCase()
    }
    if (userInfo?.firstname) return userInfo.firstname[0].toUpperCase()
    if (userInfo?.email) return userInfo.email[0].toUpperCase()
    return 'U'
  }

  useEffect(() => {
    setImageError(false)
  }, [userPic])

  return (
    <div className="w-full h-16 flex items-center justify-between px-4">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* Toggle */}
        <button
          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          onClick={() => setIssidebaropen(!isSideBarOpen)}
        >
          {isSideBarOpen ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
        </button>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 relative">

        {/* Profile */}
        {(!userPic || imageError) ? (
          <div className="bg-gradient-to-br from-lime-400 to-lime-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold">
            {getUserInitials()}
          </div>
        ) : (
          <img
            src={userPic}
            className="w-10 h-10 rounded-full object-cover border"
            onError={() => setImageError(true)}
          />
        )}

        {/* Name */}
        <div className="hidden md:flex flex-col leading-tight">
          <span className="text-sm font-medium">
            {userInfo?.firstname} {userInfo?.lastname}
          </span>
          <span className="text-xs text-neutral-500">{userInfo?.email}</span>
        </div>

        {/* Dropdown toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="p-1 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute top-12 right-0 w-44 bg-white border shadow rounded-lg z-50">

            <Link
              to="/setting"
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
            >
              <User size={16} />
              Profile Settings
            </Link>

            <button
              onClick={userLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
            >
              <LogOut size={16} />
              Logout
            </button>

          </div>
        )}

      </div>
    </div>
  )
}

export default Inappnavbar