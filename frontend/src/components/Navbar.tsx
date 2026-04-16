import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {Menu, X} from 'lucide-react'
import { AuthContext } from '@/context/authContext'

const Navbar = () => {
    const [menu, setMenu] = useState(false)
    const {isLoggedIn} = useContext(AuthContext)
    const navigate = useNavigate()
    
  return (
    <div className='w-full bg-white/30 fixed top-0 shadow backdrop-blur-xl z-50'>
        <div className='max-w-7xl mx-auto w-full'>
            <div className='hidden lg:flex w-full items-center justify-between px-6'>
                <Link to={'/'} className='flex items-center justify-start py-3 gap-2 w-full'>
                    <img src='./Logo.png' alt='logo.png' width={50}/>
                    <label className='font-semibold tracking-tight text-lime-500 text-2xl text-shadow-sm'>CipherKeep</label>
                </Link>
                <div className='flex items-center justify-between w-full gap-6'>
                    <a href="#home" className='text-neutral-800 hover:text-lime-500 transition-colors text-sm font-medium'>Home</a>
                    <a href="#features" className='text-neutral-800 hover:text-lime-500 transition-colors text-sm font-medium'>Features</a>
                    <a href="#about" className='text-neutral-800 hover:text-lime-500 transition-colors text-sm font-medium'>About</a>
                    <a href="#how-it-works" className='text-neutral-800 hover:text-lime-500 transition-colors text-sm font-medium'>How it Works</a>
                </div>
                <div className='flex items-center justify-end gap-1 w-full'>
                    {isLoggedIn ? <Button onClick={() => navigate('/dashboard')} className='px-4 py-4 bg-transparent text-neutral-800 hover:bg-lime-100 transition-all duration-200 text-sm font-semibold border-2 border-lime-200 hover:border-lime-300'>Dashboard</Button> : 
                    <Button onClick={() => navigate('/auth')} className='px-4 py-4 bg-transparent text-neutral-800 hover:bg-lime-100 transition-all duration-200 text-sm font-semibold border-2 border-lime-200 hover:border-lime-300'>Log In</Button>}
                </div>
            </div>
            <div className='lg:hidden flex w-full items-center justify-between px-3'>
                <Link to={'/'} className='flex items-center justify-center py-3 gap-2'>
                    <img src='./Logo.png' alt='logo.png' width={25}/>
                    <label className='font-semibold tracking-tight text-lime-500 text-lg text-shadow-sm'>CipherKeep</label>
                </Link>
                <button onClick={() => setMenu(!menu)} className='p-2 bg-lime-100 rounded-lg cursor-pointer hover:bg-lime-200 transition-colors duration-200'><Menu size={18}/></button>
            </div>
        </div>
        {menu && (
            <div className='lg:hidden w-full bg-white px-3 py-3 fixed top-12 shadow'>
                <div className='w-full flex justify-end'>
                    <button className='p-2 bg-gray-100 rounded-lg text-red-500' onClick={() => setMenu(false)}><X size={18}/></button>
                </div>
                <a href="#features" className='px-3 py-4 block text-neutral-800 hover:underline text-base font-semibold w-full'>Features</a>
                <a href="#about" className='px-3 py-4 block text-neutral-800 hover:underline text-base font-semibold w-full'>About</a>
                <a href="#how-it-works" className='px-3 py-4 block text-neutral-800 hover:underline text-base font-semibold w-full'>How it Works</a>
                {isLoggedIn ? <Button onClick={() => navigate('/dashboard')} className='px-3 py-4 bg-transparent text-neutral-800 hover:underline text-base font-semibold w-full'>Dashboard</Button> : <div className='w-full flex flex-col items-start justify-start gap-1'>
                    <Button onClick={() => navigate('/auth')} className='px-3 py-4 bg-transparent text-neutral-800 hover:underline text-base font-semibold w-full'>Log In</Button>
                    <Button onClick={() => navigate('/auth')} className='px-3 py-4 shadow-sm text-base font-semibold w-full bg-lime-300 text-neutral-800'>Get Started</Button>
                </div>}
            </div>
        )}
    </div>
  )
}

export default Navbar