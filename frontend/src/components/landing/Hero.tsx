import React from 'react'
import { Button } from '../ui/button'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4 px-1 relative'>
                <div className='lg:w-145 text-neutral-800'>
                    <h1 className='text-5xl font-semibold'>Navigate Your Digital Security with <span className='bg-lime-300 italic font-bold'>Confidence, Simplicity,</span> and Strength.</h1>
                </div>
                <div className='w-full flex flex-col items-start lg:items-end justify-end'>
                    <p className='lg:w-90 text-base tracking-tight text-neutral-500 font-medium'>Take control of your passwords with intelligent organization and powerful protection designed to keep your digital life secure and effortless.</p>
                    <div className='flex items-start justify-start gap-2 mt-5 lg:w-90'>
                        <Button onClick={() => navigate('/auth')} className='px-5 py-4  text-sm font-semibold bg-[#CCFF00] text-black transition-colors duration-200 hover:bg-lime-300 drop-shadow-xl drop-shadow-lime-100'>Get Started</Button>
                        <Button onClick={() => navigate('/auth')} className='px-5 py-4 text-sm tracking-tight font-semibold bg-gray-100 border border-neutral-300 hover:bg-gray-200 transition-colors duration-200 text-neutral-800 '>Sign In</Button>
                    </div>
                </div>

            </div>
            <motion.div
                initial={{
                    opacity: 0,
                    y: -10,

                }}
                animate={{
                    opacity: 1,
                    y: 10
                }}
                transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                    delay: 0.1
                }}
                className='w-full flex flex-col items-center justify-center mx-auto relative py-10 mt-20'>

                <img
                    width={1000} className='bg-gray-100 p-4 rounded-lg transform-3d -rotate-x-36 -rotate-y-18 -rotate-z-20 mask-b-from-50%' src='/hero.png' alt='hero image ' />

            </motion.div>
            <motion.div
                initial={{
                    opacity: 0,
                    y: -30,

                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                    delay: 0.3
                }}
                className='relative'>
                <img width={900} className='hidden lg:block absolute translate-y-15 -bottom-2 lg:right-10  rounded-lg transform-3d -rotate-x-36 -rotate-y-18 -rotate-z-20 mask-b-from-50%' src='/hero2.png' alt='hero image' />
            </motion.div>
        </>
    )
}

export default Hero