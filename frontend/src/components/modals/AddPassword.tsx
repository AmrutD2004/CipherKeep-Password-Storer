import { addPassword } from '@/api/endpoint'
import { Brush, BrushCleaning, Eye, EyeClosed, Loader2, Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

type onclose = {
    onClose: () => void
}

const AddPassword = ({ onClose }: onclose) => {
    const [seePassword, setSeePassword] = useState(false)
    const category = ['Social', 'Banking', 'Work', 'Entertainment', 'Others']
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        website: '',
        websiteURL: '',
        usernameoremail: '',
        password: '',
        category: '',
        notes: ''
    })

    const clearForm = () => {
        setFormData({
            website: '',
            websiteURL: '',
            usernameoremail: '',
            password: '',
            category: '',
            notes: ''
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>)=>{
        setLoading(true)
        try {
            const payload = {
                website: formData.website,
                websiteUrl: formData.websiteURL,
                usernameoremail: formData.usernameoremail,
                password: formData.password,
                category: formData.category,
                notes: formData.notes
            }
            const data = await addPassword(payload)
            if (data.success) {
                toast.success(data.message || 'Password added successfully', {
                    style: {
                        backgroundColor: '#ECFDF5',
                        color: '#065F46',
                        fontSize: '14px',
                        fontWeight: '500',
                        padding: '10px 16px',
                        boxShadow: '0 4px 16px rgba(16,185,129,0.12)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    },
                    icon: (
                        <div style={{
                            backgroundColor: '#059669',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    ),
                    duration: 2000,
                })

                setFormData({
                    website: '',
                    websiteURL: '',
                    usernameoremail: '',
                    password: '',
                    category: '',
                    notes: ''
                })
                setTimeout(() => {
                    onClose()
                    window.location.reload()
                }, 2000)
            }
            else{
                toast.error('Something went wrong, please try again after sometime!')
            }
        } catch (err) {
            console.error(err)
            setLoading(false)
        }finally{
            setLoading(false)
        }
    }
    return (
        <div className='fixed inset-0 bg-black/30 z-50'>
            <div className='flex items-center justify-center min-h-screen'>
                <div className='mx-3 lg:mx-0 px-5 py-8 bg-white w-120 rounded-lg border border-neutral-300 shadow relative'>
                    <div className='flex items-center justify-between w-full mb-5 lg:mb-10'>
                        <h1 className='text-neutral-800 tracking-tight text-base'>Add Password</h1>
                        <button className='cursor-pointer hover:text-red-500 transition-colors duration-200 absolute right-2 top-3' onClick={onClose}><X size={18} /></button>
                    </div>
                    <div className='flex flex-col items-start justify-start gap-2 lg:gap-3 w-full'>
                        <div className='flex flex-col items-start justify-start gap-1 w-full'>
                            <label className='text-sm font-medium text-neutral-800'>Website</label>
                            <input onChange={handleChange} type="text" name='website' value={formData.website} className='w-full px-3 py-1 rounded-lg outline-none text-sm border border-neutral-300' placeholder='Enter the website name' />
                        </div>
                        <div className='flex flex-col items-start justify-start gap-1 w-full'>
                            <label className='text-sm font-medium text-neutral-800'>WebsiteURL</label>
                            <input onChange={handleChange} type="text" name='websiteURL' value={formData.websiteURL} className='w-full px-3 py-1 rounded-lg outline-none text-sm border border-neutral-300' placeholder='Enter the website URL' />
                        </div>
                        <div className='flex flex-col items-start justify-start gap-1 w-full'>
                            <label className='text-sm font-medium text-neutral-800'>Username / Email</label>
                            <input onChange={handleChange} type="text" name='usernameoremail' value={formData.usernameoremail} className='w-full px-3 py-1 rounded-lg outline-none text-sm border border-neutral-300' placeholder='Enter the username or email' />
                        </div>
                        <div className='flex flex-col items-start justify-start gap-1 w-full relative'>
                            <label className='text-sm font-medium text-neutral-800'>Password</label>
                            <input onChange={handleChange} type={`${seePassword ? 'text' : 'password'}`} name='password' value={formData.password} className='w-full px-3 py-1 rounded-lg outline-none text-sm border border-neutral-300' placeholder='Enter the password' />
                            <button onClick={() => setSeePassword(!seePassword)} className='absolute top-8 right-3'>
                                {seePassword ? <Eye size={16} /> : <EyeClosed size={16} />}
                            </button>
                        </div>
                        <div className='flex flex-col items-start justify-start gap-1 w-full'>
                            <label className='text-sm font-medium text-neutral-800'>Category</label>
                            <select onChange={handleChange} className='bg-white px-4 py-1 rounded-lg shadow text-sm border border-neutral-300 w-full outline-none' name="category" id="" value={formData.category}>
                                <option value="">Select Category</option>
                                {category.map((items, idx) => (
                                    <option key={idx} value={items}>{items}</option>
                                ))}

                            </select>
                        </div>
                        <div className='flex flex-col items-start justify-start gap-1 w-full'>
                            <label className='text-sm font-medium text-neutral-800'>Hint</label>
                            <textarea onChange={handleChange} name='notes' value={formData.notes} className='w-full px-3 py-1 rounded-lg outline-none text-sm border border-neutral-300' placeholder='Enter the username or email' />
                        </div>
                        <div className='w-full flex items-end mt-4 justify-end gap-2'>
                            <button type='button' onClick={clearForm} className='flex items-center gap-1 px-3 py-1 text-xs bg-gray-2 border border-neutral-300 00 rounded-lg text-neutral-500 shadow-sm cursor-pointer'><BrushCleaning size={18} />Clear Form</button>
                            <button type='submit' onClick={handleSubmit} disabled={loading} className={`flex items-center gap-1 text-sm font-medium px-3 py-1 bg-lime-500 text-white rounded-lg shadow ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                {loading ? (<><Loader2 className='animate-spin' size={18} />Adding Password...</>) : (<><Plus size={18} />Add Password</>)}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPassword