import { updateUserDetials } from '@/api/endpoint'
import Layout from '@/components/Layout/Layout'
import { AuthContext } from '@/context/authContext'
import { Loader2, Save } from 'lucide-react'
import React, { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import toast from 'react-hot-toast'

const Setting = () => {
  const { userInfo } = useContext(AuthContext)
  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<{} | string | any>({
    username: '',
    email: ''
  })
  useEffect(() => {
  if (userInfo) {
    setFormData({
      username: userInfo?.username || '',
      email: userInfo?.email || ''
    });
  }
}, [userInfo]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        username: formData.username,
        email: formData.email
      }
      const data = await updateUserDetials(payload)
      if (data.success) {
        toast.success(data.message, {
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
      }
    }catch(err){
      console.error( err )
      setLoading(false)
    }finally{
      setLoading(false)
    }
  }
  const getInitials = () => {
    if (userInfo?.firstname && userInfo?.lastname) {
      return `${userInfo.firstname[0]}${userInfo.lastname[0]}`.toUpperCase()
    }
    if (userInfo?.firstname) {
      return userInfo.firstname[0].toUpperCase()
    }
    if (userInfo?.email) {
      return userInfo.email[0].toUpperCase()
    }
    return 'U'
  }
  return (
    <Layout>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col items-start justify-start gap-1 p-5 '>
          <h1 className='text-2xl lg:text-3xl tracking-tight leading-tight text-neutral-800'>Setting</h1>
          <h2 className='text-sm text-neutral-500 tracking-tight font-normal leading-2'>Manage your account and preferences</h2>
        </div>
        <div className='border border-neutral-300 rounded-lg lg:w-150 shadow overflow-hidden mx-3'>
          <div className='w-full flex flex-col items-start justify-start gap-1 bg-transparent py-3'>
            <h1 className='text-lg tracking-tight text-neutral-800 px-5'>Account information</h1>
            <h2 className='text-xs text-neutral-500 tracking-tight font-normal leading-2 px-5'>Update your profile details</h2>

          </div>
          <div className='bg-white w-full border-t border-neutral-300 px-5 py-3'>
            <form onSubmit={handleSubmit} className='bg-gray-100 rounded-lg px-5 py-3 flex flex-col gap-3'>
              <div className='flex items-center justify-start gap-3'>
                <div
                  className='bg-gradient-to-br from-lime-400 to-lime-600 text-white text-lg font-semibold w-15 h-15 rounded-full flex items-center justify-center shadow-md'
                >
                  {getInitials()}
                </div>
                <div className='flex flex-col items-start justify-start'>
                  <h1 className='text-neutral-800 tracking-tight'>{userInfo?.username}</h1>
                  <h2 className='text-xs text-neutral-500'>{userInfo?.email}</h2>
                </div>
              </div>
              <div className='flex flex-col items-start justify-start gap-1'>
                <label className="text-neutral-800 tracking-tight text-sm">Username</label>
                <input onChange={handleChange} type="text" name="username" className='w-full px-3 py-1 text-sm rounded-lg border border-neutral-300 bg-white placeholder:font-normal' placeholder='Enter Username' value={formData.username} />
              </div>
              <div className='flex flex-col items-start justify-start gap-1'>
                <label className="text-neutral-800 tracking-tight text-sm">Email</label>
                <input onChange={handleChange} type="text" name="email" className='w-full px-3 py-1 text-sm rounded-lg border border-neutral-300 bg-white placeholder:font-normal' placeholder='Enter Email' value={formData.email} />
              </div>
              <div className='w-full flex items-end justify-end'>
                <button disabled={loading} className={`flex gap-1 items-center  text-xs lg:text-sm text-white px-3 py-1 rounded-lg shadow tracking-tight   transition-colors duration-200 ${loading ? 'bg-lime-600 cursor-not-allowed' : 'bg-lime-500 hover:bg-lime-600 cursor-pointer'}`}>
                  {loading ? (
                    <><Loader2 className='animate-spin' size={18} />Saving Changes...</>
                  ) : (
                    <><Save size={18} />Save Changes</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Setting