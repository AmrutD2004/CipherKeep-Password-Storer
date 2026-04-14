import { editPasswords } from '@/api/endpoint'
import { Check, Eye, EyeClosed, Loader2, Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

type props = {
    onClose: () => void,
    password: any
}

const EditPasswordDetails = ({ onClose, password }: props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [seePassword, setSeePassword] = useState(false)
    const category = ['Social', 'Banking', 'Work', 'Entertainment', 'Others']
    const [formData, setFormData] = useState<any | {}>({
        website: password.website || '',
        websiteURL: password.websiteUrl || '',
        usernameoremail: password.usernameoremail || '',
        password: password.password || '',
        category: password.category || '',
        notes: password.notes || ''
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev: any) => ({ ...prev, [name]: value }))
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const payload = {
                cred_id: password.cred_id,
                website: formData.website,
                websiteUrl: formData.websiteURL,
                usernameoremail: formData.usernameoremail,
                password: formData.password,
                category: formData.category,
                notes: formData.notes
            }
            const data = await editPasswords(payload)
            if (data.success) {
                toast.success(data.message || 'Password edited successfully', {
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
                setTimeout(() => {
                    onClose()
                    window.location.reload()
                }, 2000)
            }
            else {
                toast.error('Something went wrong, please try again after sometime!')
            }
        } catch (err) {
            console.error(err)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='fixed inset-0 bg-black/30 z-50'>
            <div className='flex items-center justify-center min-h-screen'>
                <div className='mx-3 lg:mx-0 px-5 py-8 bg-white w-120 rounded-lg border border-neutral-300 shadow'>
                    <div className='flex items-center justify-between w-full mb-5 lg:mb-10'>
                        <h1 className='text-neutral-800 tracking-tight text-base'>Edit Password of <strong className='text-lime-500 text-lg ms-1'>{password.website}</strong></h1>
                        <button className='cursor-pointer hover:text-red-500 transition-colors duration-200' onClick={onClose}><X size={18} /></button>
                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-col items-start justify-start gap-2 lg:gap-3 w-full'>
                        <div className='flex flex-col items-start justify-start gap-1 w-full'>
                            <label className='text-sm font-medium text-neutral-800'>Website</label>
                            <input onChange={handleChange} type="text" name='website' value={formData.website} className='w-full px-3 py-1 rounded-lg outline-none text-sm border border-neutral-300 font-normal text-neutral-700' placeholder='Enter the website name' />
                        </div>
                        <div className='flex flex-col items-start justify-start gap-1 w-full'>
                            <label className='text-sm font-medium text-neutral-800'>WebsiteURL</label>
                            <input onChange={handleChange} type="text" name='websiteURL' value={formData.websiteURL} className='w-full px-3 py-1 rounded-lg outline-none text-sm border border-neutral-300 font-normal text-neutral-700' placeholder='Enter the website URL' />
                        </div>
                        <div className='flex flex-col items-start justify-start gap-1 w-full'>
                            <label className='text-sm font-medium text-neutral-800'>Username / Email</label>
                            <input onChange={handleChange} type="text" name='usernameoremail' value={formData.usernameoremail} className='w-full px-3 py-1 rounded-lg outline-none text-sm border border-neutral-300 font-normal text-neutral-700' placeholder='Enter the username or email' />
                        </div>
                        <div className='flex flex-col items-start justify-start gap-1 w-full relative'>
                            <label className='text-sm font-medium text-neutral-800'>Password</label>
                            <input onChange={handleChange} type={`${seePassword ? 'text' : 'password'}`} name='password' value={formData.password} className='w-full px-3 py-1 rounded-lg outline-none text-sm border border-neutral-300 font-normal text-neutral-700' placeholder='Enter the password' />
                            <button type='button' onClick={() => setSeePassword(!seePassword)} className='absolute top-8 right-3'>
                                {seePassword ? <Eye size={16} /> : <EyeClosed size={16} />}
                            </button>
                        </div>
                        <div className='flex flex-col items-start justify-start gap-1 w-full'>
                            <label className='text-sm font-medium text-neutral-800'>Category</label>
                            <select onChange={handleChange} className='bg-white px-4 py-1 rounded-lg shadow text-sm border border-neutral-300 w-full outline-none font-normal text-neutral-700' name="category" id="" value={formData.category}>
                                <option value="">Select Category</option>
                                {category.map((items, idx) => (
                                    <option key={idx} value={items}>{items}</option>
                                ))}

                            </select>
                        </div>
                        <div className='flex flex-col items-start justify-start gap-1 w-full'>
                            <label className='text-sm font-medium text-neutral-800'>Hint</label>
                            <textarea onChange={handleChange} name='notes' value={formData.notes} className='w-full px-3 py-1 rounded-lg outline-none text-sm border border-neutral-300 font-normal text-neutral-700' placeholder='Enter the username or email' />
                        </div>
                        <div className='w-full flex items-end mt-4 justify-end gap-2'>
                            <button type='submit' disabled={loading} className={`flex items-center gap-1 text-sm font-medium px-3 py-1 bg-lime-500 text-white rounded-lg shadow ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                {loading ? (<><Loader2 className='animate-spin' size={18} />Saving Changes...</>) : (<><Check size={18} />Save Changes</>)}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditPasswordDetails