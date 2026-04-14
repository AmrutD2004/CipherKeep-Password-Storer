import { AuthContext } from '@/context/authContext'
import { FolderLock, Home, LogOut, Settings, Space } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '../ui/button'

const Sidebar = () => {
    const {userPic, userInfo, userLogout} = useContext(AuthContext)
    const [imageError, setImageError] = useState(false)
    
    const menus = [
        {
            title: 'Dashboard',
            path: '/dashboard',
            icon: <Home size={18} />
        },
        {
            title: 'Vault',
            path: '/vault',
            icon: <FolderLock size={18} />
        },
        {
            title: 'Setting',
            path: '/setting',
            icon: <Settings size={18} />
        },
    ]

    // Function to get initials for fallback
    const getInitials = () => {
        if (userInfo?.firstname && userInfo?.lastname) {
            return `${userInfo.firstname[0]}${userInfo.lastname[0]}`.toUpperCase()
        }
        if (userInfo?.firstname) {
            return userInfo.firstname[0].toUpperCase()
        }
        if (userInfo?.email) {
            return userInfo.email[0].toUpperCase()
        }
        return 'U'
    }

    return (
        <aside className='h-screen w-64 border-r border-lime-300 relative bg-lime-50 overflow-hidden flex flex-col'>
            <div className='flex h-full flex-col gap-3'>
                <div className='w-full flex items-center'>
                    <div className='flex items-start justify-start p-5 gap-3 relative'>
                        <label className='font-semibold tracking-tight text-lime-500 text-2xl text-shadow-sm'>ClpherKeep</label>
                        <span className='bg-lime-500 rounded-full p-[3px] absolute left-[37px] top-4 animate-pulse'></span>
                    </div>
                    <div className='flex items-end justify-end w-full'>
                        <img width={130} src="/Logo.png" alt="logo" className='absolute right-0 top-0 translate-x-12 transform-3d rotate-x-30 -rotate-y-38 rotate-z-28 mask-l-from-40% mask-b-from-40%' />
                    </div>
                </div>
                <div className='flex flex-1 h-full flex-col items-start justify-start gap-5 px-5 py-3 w-full'>
                    {menus.map((item, idx) => (
                        <NavLink
                            key={idx}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-1 hover:bg-lime-100 py-2 px-3 rounded-lg transition-colors duration-200 w-full ${isActive ? 'bg-lime-500 text-white hover:bg-lime-500 drop-shadow-xl drop-shadow-lime-200' : 'hover:text-lime-500'}`
                            }
                        >
                            {item.icon}
                            {item.title}
                        </NavLink>
                    ))}
                </div>
                <div className='mt-auto flex flex-col gap-3'>
                    <hr className='mx-4 border-lime-500 mask-r-from-10% mask-l-from-10%'/>
                    <div className='px-5 pb-5 w-full h-full'>
                        <div className='flex items-center justify-start w-full gap-3'>
                            {/* Profile Image/Icon Section */}
                            {(!userPic || imageError) ? (
                                // Fallback: Show colored initials
                                <div 
                                    className='bg-gradient-to-br from-lime-400 to-lime-600 text-white text-sm font-semibold w-10 h-10 rounded-full flex items-center justify-center shadow-md'
                                >
                                    {getInitials()}
                                </div>
                            ) : (
                                // Try to show image with error handling
                                <div className='relative w-10 h-10'>
                                    <img 
                                        width={40} 
                                        height={40}
                                        className='rounded-full object-cover w-full h-full border-2 border-lime-300 shadow-sm' 
                                        src={userPic} 
                                        alt={`${userInfo?.firstname || 'User'}'s profile`}
                                        onError={() => {
                                            console.error('Failed to load profile image:', userPic)
                                            setImageError(true)
                                            localStorage.removeItem('userPic')
                                        }}
                                        loading="lazy"
                                    />
                                    {imageError && (
                                        <div className='absolute inset-0 bg-lime-500 rounded-full flex items-center justify-center'>
                                            <span className='text-white text-xs font-bold'>{getInitials()}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className='flex flex-col items-start justify-start leading-tight'>
                                <div className='flex items-center gap-1'>
                                    <span className='text-sm text-neutral-800 font-medium'>{userInfo?.firstname || ''}</span>
                                    <span className='text-sm text-neutral-800 font-medium'>{userInfo?.lastname || ''}</span>
                                </div>
                                <span className='text-xs text-neutral-500 truncate max-w-[140px]' title={userInfo?.email}>
                                    {userInfo?.email || 'No email'}
                                </span>
                            </div>
                        </div>
                        <div className='flex items-center justify-start w-full mt-5'>
                            <Button onClick={userLogout} className='flex items-center gap-1 text-red-500 text-sm font-medium bg-transparent hover:bg-transparent hover:text-red-600 transition-colors'>
                                <LogOut size={16}/>
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default React.memo(Sidebar)