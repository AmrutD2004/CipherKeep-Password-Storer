import Carousel from '@/components/Carousel'
import Footer from '@/components/landing/Footer'
import Hero from '@/components/landing/Hero'
import HowitWork from '@/components/landing/HowitWork'
import WhatweOffer from '@/components/landing/WhatweOffer'
import Navbar from '@/components/Navbar'
import React from 'react'

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className='w-full flex flex-col space-y-[10vh]'>
        <div className='h-[10vh]'></div>
        <div className='max-w-7xl mx-auto w-full ' id='home'>
          <Hero />
        </div>
        <Carousel />
        <div id='features'>
          <WhatweOffer />
        </div>
        <div className='bg-neutral-900' id='how-it-works'>
          <HowitWork />
        </div>
      </div>
      
    </>
  )
}

export default Landing