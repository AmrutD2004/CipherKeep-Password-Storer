import { AuthContext } from '@/context/authContext'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'

const HowitWork = () => {
    const { isLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = useState(1)

    const steps = [
        {
            id: 1,
            number: '01',
            title: 'Create your account',
            desc: 'Sign up with just your email — no credit card, no friction. Your master password never leaves your device.',
            visual: (
                <div className="w-full max-w-md bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-800">
                    <h2 className="text-neutral-500 text-sm font-medium tracking-wider uppercase mb-6">
                        Account Setup
                    </h2>
                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="you@email.com"
                            readOnly
                            disabled
                            className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all cursor-default"
                        />
                        <input
                            type="password"
                            placeholder="••••••••••••"
                            readOnly
                            disabled
                            className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all cursor-default"
                        />
                        <button 
                            onClick={() => isLoggedIn ? navigate('/vault') : navigate('/auth')}
                            disabled
                            className="w-full bg-lime-400 hover:bg-lime-300 text-black font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 mt-6 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Create vault
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            )
        },
        {
            id: 2,
            number: '02',
            title: 'Add passwords instantly',
            desc: 'Click "Add New", enter website + credentials, pick a category. Saved and encrypted in milliseconds.',
            visual: (
                <div className="w-full max-w-md bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-800">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-neutral-500 text-sm font-medium tracking-wider uppercase">Add Entry</h2>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-lime-400/20 text-lime-400 border border-lime-400/30">New</span>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3">
                            <label className="text-xs text-neutral-500 uppercase tracking-wide">Website</label>
                            <p className="text-white mt-1">github.com</p>
                        </div>
                        <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3">
                            <label className="text-xs text-neutral-500 uppercase tracking-wide">Username</label>
                            <p className="text-white mt-1">you@example.com</p>
                        </div>
                        <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3">
                            <label className="text-xs text-neutral-500 uppercase tracking-wide">Password</label>
                            <div className="flex items-center justify-between mt-1">
                                <p className="text-white">••••••••••••</p>
                                <span className="text-xs px-2 py-0.5 rounded bg-green-400/20 text-green-400">Strong</span>
                            </div>
                        </div>
                        <button className="w-full bg-lime-400 hover:bg-lime-300 text-black font-semibold py-3 rounded-xl transition-all duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                            Save to vault
                        </button>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            number: '03',
            title: 'Edit & organize anytime',
            desc: 'Need to update a password or change categories? Click edit, make changes, done. Everything stays synced.',
            visual: (
                <div className="w-full max-w-md bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-800">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-neutral-500 text-sm font-medium tracking-wider uppercase">Edit Entry</h2>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700">github.com</span>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-neutral-800/50 border border-lime-400/50 rounded-xl px-4 py-3">
                            <label className="text-xs text-lime-400 uppercase tracking-wide">Website</label>
                            <input type="text" defaultValue="github.com" readOnly disabled className="w-full bg-transparent text-white mt-1 focus:outline-none" />
                        </div>
                        <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3">
                            <label className="text-xs text-neutral-500 uppercase tracking-wide">Category</label>
                            <select className="w-full bg-transparent text-white mt-1 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                                <option className="bg-neutral-800">Work</option>
                                <option className="bg-neutral-800">Social</option>
                                <option className="bg-neutral-800">Banking</option>
                            </select>
                        </div>
                        <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3">
                            <label className="text-xs text-neutral-500 uppercase tracking-wide">New Password</label>
                            <input type="password" placeholder="••••••••••••" disabled className="w-full bg-transparent text-white mt-1 focus:outline-none placeholder-neutral-600" />
                        </div>
                        <button className="w-full bg-lime-400 hover:bg-lime-300 text-black font-semibold py-3 rounded-xl transition-all duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                            Update entry
                        </button>
                    </div>
                </div>
            )
        },
        {
            id: 4,
            number: '04',
            title: 'Delete with one click',
            desc: 'Remove unused credentials anytime. Confirm once, gone forever. No traces, no recovery — just clean control.',
            visual: (
                <div className="w-full max-w-md bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-red-400/20 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-white font-medium">Delete github.com?</h3>
                            <p className="text-xs text-neutral-500">This action cannot be undone.</p>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                            Cancel
                        </button>
                        <button className="flex-1 bg-red-500 hover:bg-red-400 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                            Delete
                        </button>
                    </div>
                </div>
            )
        }
    ]

    return (
        <div className='max-w-7xl mx-auto'>
            <div className='hidden lg:block lg:h-[10vh]'></div>
            
            {/* Header */}
            <div className='flex flex-col items-start justify-start gap-1 p-3'>
                <strong className='text-neutral-500 uppercase text-sm tracking-wide'>How it works</strong>
                <h1 className='text-white font-semibold tracking-tight text-4xl'>Up and running in 4 steps.</h1>
            </div>

            {/* Steps */}
            <div className='flex flex-col gap-8 mt-8 px-3'>
                {steps.map((step) => (
                    <div 
                        key={step.id} 
                        className={`grid grid-cols-1 lg:grid-cols-2 gap-3 items-start cursor-pointer transition-all duration-300 ${activeStep === step.id ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                        onClick={() => setActiveStep(step.id)}
                    >
                        {/* Left: Step info */}
                        <div className='flex flex-col items-start justify-start gap-1 py-2'>
                            <h1 className='text-6xl font-bold text-neutral-700'>{step.number}</h1>
                            <h2 className='text-2xl tracking-wide text-white'>{step.title}</h2>
                            <p className='tracking-wide text-neutral-500'>{step.desc}</p>
                        </div>
                        
                        {/* Right: Visual card */}
                        <div className='w-full'>
                            {step.visual}
                        </div>
                    </div>
                ))}
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default HowitWork