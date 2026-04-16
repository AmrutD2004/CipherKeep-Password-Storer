import { Mobile, Profile2User, Shield } from 'iconsax-reactjs';
import React from 'react'

const WhatweOffer = () => {
    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-0'>
            <div className='flex flex-col items-start justify-start gap-2'>
                <h2 className='uppercase tracking-wide text-xs sm:text-sm text-neutral-500'>What we offer</h2>
                <h1 className='text-3xl sm:text-4xl tracking-tight text-neutral-800'>Built different. Built secure.</h1>
            </div>
            
            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto md:auto-rows-[150px] mt-6">

                {/* Big wide card - full width on mobile, 2x2 on desktop */}
                <div className="col-span-1 md:col-span-2 row-span-1 md:row-span-2 rounded-xl bg-lime-300 p-4 hover:scale-[1.02] transition-all duration-300">
                    <div className='flex flex-col items-start justify-start gap-3 px-2 py-2'>
                        <h2 className='uppercase tracking-wide text-xs text-neutral-800'>Core feature</h2>
                        <div>
                            <h1 className='text-lg sm:text-2xl text-neutral-800 tracking-tight'>Your encrypted vault — organized, instant, yours.</h1>
                        </div>
                        <p className='text-sm text-neutral-600'>Every credential lives in one AES-256 encrypted vault. Search, organize, and access in milliseconds. Only you hold the key.</p>
                        
                        {/* Preview cards - stack on mobile */}
                        <div className='flex flex-col w-full gap-2 mt-2'>
                            <div className='w-full bg-white px-3 py-2 rounded-lg flex items-center justify-between'>
                                <h1 className='text-sm text-neutral-800 tracking-tight'>github.com</h1>
                                <div className='flex gap-0.5'>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                                        <span key={item} className='p-0.5 rounded-full bg-gray-400'></span>
                                    ))}
                                </div>
                                <span className='text-xs px-2 py-0.5 rounded-full bg-green-200 text-green-600 border border-green-500 whitespace-nowrap'>Strong</span>
                            </div>
                            <div className='w-full bg-white px-3 py-2 rounded-lg flex items-center justify-between'>
                                <h1 className='text-sm text-neutral-800 tracking-tight'>netflix.com</h1>
                                <div className='flex gap-0.5'>
                                    {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                                        <span key={item} className='p-0.5 rounded-full bg-gray-400'></span>
                                    ))}
                                </div>
                                <span className='text-xs px-2 py-0.5 rounded-full bg-orange-200 text-orange-600 border border-orange-500 whitespace-nowrap'>Medium</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats card - full width on mobile */}
                <div className="col-span-1 md:col-span-1 row-span-1 bg-white border rounded-xl p-4 hover:bg-gray-50 hover:scale-[1.02] transition-all duration-200">
                    <h1 className='text-3xl sm:text-4xl font-semibold text-neutral-800'>100k+</h1>
                    <div className='w-full flex items-center gap-3 mt-3'>
                        <span className='p-2 bg-gray-100 rounded-lg flex-shrink-0'>
                            <Profile2User size="28" variant="Broken" />
                        </span>
                        <p className='text-sm text-neutral-500'>users protected worldwide</p>
                    </div>
                </div>

                {/* Encryption card */}
                <div className="col-span-1 md:col-span-1 row-span-1 bg-white border rounded-xl p-4 hover:bg-gray-50 hover:scale-[1.02] transition-all duration-200">
                    <h1 className='text-2xl sm:text-4xl font-semibold text-neutral-800'>256 <span className='text-sm text-neutral-500 font-medium'>bit AES</span></h1>
                    <div className='w-full flex items-center gap-3 mt-3'>
                        <span className='p-2 bg-gray-100 rounded-lg flex-shrink-0'>
                            <Shield size="28" variant="Broken" />
                        </span>
                        <p className='text-sm text-neutral-500'>no more texting credentials in plain sight.</p>
                    </div>
                </div>

                {/* Sync card - full width on mobile, 2-col on desktop */}
                <div className="col-span-1 md:col-span-2 bg-white border rounded-xl p-4 hover:bg-gray-50 hover:scale-[1.02] transition-all duration-200">
                    <h1 className='text-2xl sm:text-4xl font-semibold text-neutral-800'>Cross-device sync</h1>
                    <div className='w-full flex items-start sm:items-center gap-3 mt-3 flex-col sm:flex-row'>
                        <span className='p-2 bg-gray-100 rounded-lg flex-shrink-0'>
                            <Mobile size="28" variant="Broken" />
                        </span>
                        <p className='text-sm text-neutral-500'>Your vault stays in sync across every phone, tablet, and computer — always up to date, always available.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default WhatweOffer