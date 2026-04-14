import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {Menu, X} from 'lucide-react'
const Navbar = () => {
    const [menu, setMenu] = useState(false)
    const navigate = useNavigate()
  return (
    <div className='w-full bg-white/30 fixed top-0 shadow backdrop-blur-xl'>
        <div className='max-w-7xl mx-auto'>
            <div className='hidden lg:flex w-full items-center justify-between '>
                <Link to={'/'} className='flex items-center justify-center py-3 gap-2'>
                <img src='./Logo.png' alt='logo.png' width={50}/>
                <label className='font-semibold tracking-tight text-lime-500 text-2xl text-shadow-sm'>CipherKeep</label>
                </Link>
                <div className='flex items-center justify-center gap-1'>
                
                <Button onClick={() => navigate('/auth')} className='px-4 py-4 bg-transparent text-neutral-800 hover:bg-lime-100 transition-all duration-200 text-sm font-semibold border-2 border-lime-200 hover:border-lime-300  '>Log In</Button>
            </div>
            </div>
            <div className='lg:hidden flex w-full items-center justify-between mx-3'>
                <Link to={'/'} className='flex items-center justify-center py-3 gap-2'>
                <img src='./Logo.png' alt='logo.png' width={25}/>
                <label className='font-semibold tracking-tight text-lime-500 text-lg text-shadow-sm'>CipherKeep</label>
                </Link>
                <button onClick={() => setMenu(!menu)} className='me-4 p-2 bg-lime-100 rounded-lg cursor-pointer hover:bg-lime-200 transition-colors duration-200'><Menu size={18}/></button>
            </div>
            
        </div>
        {menu && (
            <div className='lg:hidden w-full bg-white px-3 py-3 fixed top-12 shadow'>
                <div className='w-full flex justify-end'>
                    <button className='p-2 bg-gray-100 rounded-lg text-red-500' onClick={() => setMenu(false)}><X size={18}/></button>
                </div>
                <div className='w-full flex flex-col items-start justify-start gap-1'>
                    <Button onClick={() => navigate('/login')} className='px-3 py-4 bg-transparent text-neutral-800 hover:underline hover:bg-transparent text-base font-semibold w-full'>Log In</Button>
                <Button onClick={() => navigate('/signup')} className='px-3 py-4 shadow-sm text-base font-semibold w-full'>Get Started</Button>
                </div>
            </div>
        )}
    </div>
  )
}

export default Navbar