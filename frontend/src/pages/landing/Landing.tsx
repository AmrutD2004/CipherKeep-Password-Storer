import Hero from '@/components/landing/Hero'
import Navbar from '@/components/Navbar'
import React from 'react'

const Landing = () => {
  return (
    <div className='w-full'>
        <Navbar />
        <div className='h-[20vh]'></div>
        <div className='max-w-7xl mx-auto '>
            <Hero /> 
        </div>
    </div>
  )
}

export default Landing