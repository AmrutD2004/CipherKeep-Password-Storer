import React from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate()
  return (
    <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mx-3'>
        <div className='w-130 lg:w-145 text-neutral-800'>
            <h1 className='text-5xl font-semibold'>Navigate Your Digital Security with <span className='bg-lime-300 italic font-bold'>Confidence, Simplicity,</span> and Strength.</h1>
        </div>
        <div className='w-full flex flex-col items-start lg:items-end justify-end'>
            <p className='w-90 text-base tracking-tight text-neutral-500 font-medium'>Take control of your passwords with intelligent organization and powerful protection designed to keep your digital life secure and effortless.</p>
            <div className='flex items-start justify-start gap-2 mt-5 w-90'>
                <Button onClick={() => navigate('/auth')} className='px-5 py-4  text-sm font-semibold bg-[#CCFF00] text-black transition-colors duration-200 hover:bg-lime-300 drop-shadow-xl drop-shadow-lime-100'>Get Started</Button>
             <Button onClick={() => navigate('/auth')} className='px-5 py-4 text-sm tracking-tight font-semibold bg-gray-100 border border-neutral-300 hover:bg-gray-200 transition-colors duration-200 text-neutral-800 '>Sign In</Button>
            </div>
        </div>
    </div>
  )
}

export default Hero