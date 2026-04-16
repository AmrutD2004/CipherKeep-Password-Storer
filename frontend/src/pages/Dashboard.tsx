import Layout from '@/components/Layout/Layout'
import AddPassword from '@/components/modals/AddPassword'
import { AuthContext } from '@/context/authContext'
import { PasswordContext } from '@/context/passwordContext'
import { Copy, Edit, Edit2, Lock, Plus, Shield, Trash, Trash2, TriangleAlert } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'
import EditPasswordDetails from '@/components/modals/EditPasswordDetails'
import ConfirmDelete from '@/components/modals/ConfirmDelete'

const Dashboard = () => {
  const { userInfo } = useContext(AuthContext)
  const { usersPasswords, fetchLoading } = useContext(PasswordContext)
  const [selectedPassword, setSelectedPassword] = useState<any | null>(null)
  const date = new Date
  const todaysDate = date.toLocaleDateString('en-IN', {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric"
  })



  const isLoading = fetchLoading

  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const password = usersPasswords.password

  const checkPasswordStrength = (password: any) => {
    const isStrong =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)

    return isStrong ? 'strong' : 'weak'
  }
  let weak = 0
  let strong = 0

  usersPasswords.forEach((item: any) => {
    if (checkPasswordStrength(item.password) === 'strong') {
      strong++
    } else {
      weak++
    }
  })
  const isStorng = usersPasswords.forEach((item: any) => {
    if (checkPasswordStrength(item.password) === 'strong') {
      return 'strong'
    }
    if (checkPasswordStrength(item.password) === 'weak') {
      return 'weak'
    }
  })


  const grids = [
    {
      title: 'Total Passwords',
      length: usersPasswords.length,
      icon: <Lock size={16} />,
      bgcolor: 'text-yellow-600',
      bordercolor: 'border-yellow-600',
      hoverBorder: 'hover:border-yellow-600',
    },
    {
      title: 'Weak Passwords',
      length: weak,
      icon: <TriangleAlert size={16} />,
      bgcolor: 'text-red-600',
      bordercolor: 'border-red-600',
      hoverBorder: 'hover:border-red-600',
    },
    {
      title: 'Strong Passwords',
      length: strong,
      icon: <Shield size={16} />,
      bgcolor: 'text-green-600',
      bordercolor: 'border-green-600',
      hoverBorder: 'hover:border-green-600',
    },
  ]
  const handleCopy = async (password: any) => {
    try {
      await navigator.clipboard.writeText(password)
      toast.success('Password Copied', {
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
    } catch (err) {
      console.error(err)
    }
  }



  if (isLoading) {
    return (<SkeletonDashboard />
    )
  }

  if (usersPasswords.length === 0) {
    return (
      <>
        <Layout>
          <div className="lg:max-w-6xl mx-auto bg-gray-100 flex flex-col space-y-5">

            {/* Header */}
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between w-full'>
              <div className='py-6 flex flex-col items-start gap-1'>
                <h1 className='text-3xl font-semibold tracking-tight text-neutral-800'>
                  Welcome back! {userInfo?.firstname}👋
                </h1>
                <span className='text-sm text-neutral-500 font-medium'>
                  {todaysDate}
                </span>
              </div>

              <button
                onClick={() => setOpen(true)}
                className='flex items-center gap-1 px-3 py-1 text-sm rounded-lg bg-lime-500 text-white font-medium shadow hover:bg-lime-600 transition'
              >
                <Plus size={18} />
                Add Password
              </button>
            </div>

            {/* EMPTY STATE MESSAGE 👇 */}
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
              <p className="text-lg font-medium text-neutral-600">
                No passwords saved yet
              </p>
              <p className="text-sm text-neutral-400 mt-1">
                Click "Add Password" to get started
              </p>

              <button
                onClick={() => setOpen(true)}
                className="mt-4 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600"
              >
                + Add Password
              </button>
            </div>

          </div>
        </Layout>

        {open && <AddPassword onClose={() => setOpen(false)} />}
      </>
    )
  }
  return (
    <>
      <Layout>
        <div className='bg-gray-100 flex flex-col space-y-5 3xl:max-w-7xl'>
          <div className='flex flex-col lg:flex-row items-start lg:items-center lg:justify-between w-full px-3 lg:px-0'>
            <div className='py-6 flex flex-col items-start justify-start gap-1'>
              <h1 className='text-2xl lg:text-3xl font-semibold tracking-tight text-neutral-800'>Welcome back! {userInfo?.firstname}👋</h1>
              <span className='tracking-tight text-sm text-neutral-500 font-medium'>{todaysDate}</span>
            </div>
            <button onClick={() => setOpen(true)} className='flex items-center gap-1 px-3 py-1 text-sm rounded-lg bg-lime-500 text-white font-medium tracking-tight shadow cursor-pointer hover:bg-lime-600 transition-colors duration-200'><Plus size={18} />Add Password</button>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 px-3 lg:px-0'>
            {grids.map((items, idx) => (
              <div key={idx} className={`border lg:w-84 border-neutral-300 rounded-lg shadow px-5 py-3 flex flex-col items-start justify-start gap-2 bg-white hover:border-1.5 hover:scale-101 ${items.hoverBorder} transition-all duration-300`}>
                <span className={`p-2 bg-gray-100 rounded-lg ${items.bgcolor}`}>{items.icon}</span>
                <h1 className='text-neutral-500 font-medium tracking-tight'>{items.title}</h1>
                <span className={`${items.bgcolor} text-3xl font-semibold`}>{items.length}</span>
              </div>
            ))}
          </div>
          <div className='w-full flex flex-col items-start justify-start border border-neutral-300 rounded-lg bg-white shadow '>
            <div className='w-full flex items-start justify-between px-5 py-5 '>
              <h1 className='text-xl tracking-tight text-neutral-800 font-medium leading-tight'>Recent Passwords</h1>
              <Link to={'/vault'} className='px-3 py-1 text-sm tracking-tight border border-lime-300 text-lime-500 rounded-lg hover:bg-lime-100 transition-colors duration-200'>View All</Link>
            </div>
            <div className='px-5 py-4 w-full overflow-x-auto'>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className="border-t border-b bg-gray-50 ">
                    <th className="text-left text-sm text-neutral-500 font-medium py-3 px-4">Website</th>
                    <th className="text-center text-sm text-neutral-500 font-medium py-3 px-4">Password Status</th>
                    <th className="text-left text-sm text-neutral-500 font-medium py-3 px-4">Username / Email</th>
                    <th className="text-left text-sm text-neutral-500 font-medium py-3 px-4">Created At</th>
                    <th className="text-center text-sm text-neutral-500 font-medium py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersPasswords.reverse().slice(0, 5).map((item: any) => (
                    <tr key={item.cred_id} className="border-b hover:bg-lime-50 transition-colors duration-200">

                      {/* Website */}
                      <td className="py-3 px-4 text-sm text-neutral-700">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1.5 bg-lime-100 text-lime-600 rounded-lg font-medium">
                            {item.website?.[0]}
                          </span>
                          {item.website}

                        </div>
                      </td>

                      <td className="py-3 px-4 text-sm text-neutral-600 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded ${checkPasswordStrength(item.password) === 'strong'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                          }`}>
                          {checkPasswordStrength(item.password)}
                        </span>
                      </td>
                      {/* Username */}
                      <td className="py-3 px-4 text-sm text-neutral-600">
                        {item.usernameoremail}
                      </td>

                      {/* Created At */}
                      <td className="py-3 px-4 text-sm text-neutral-500">
                        {dayjs(item.created_at).format('DD MMM YYYY')}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-sm flex items-center justify-center">
                        <div className='flex items-center gap-3'>
                          <button onClick={() => handleCopy(item.password)} className="text-neutral-600 p-2 hover:bg-lime-100 hover:text-lime-500 transition-colors duration-300 cursor-pointer rounded-lg group relative">
                            <Copy size={18} />
                            <span className='absolute bottom-6 left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300'>Copy Password</span>
                          </button>
                          <button onClick={() => {
                            setOpenEdit(true)
                            setSelectedPassword(item)
                          }}
                            className="text-neutral-600 p-2 hover:bg-lime-100 hover:text-lime-500 transition-colors duration-300 cursor-pointer rounded-lg group relative">
                            <span className='absolute bottom-6 left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300'>Edit</span>
                            <Edit size={18} />
                          </button>

                          <button onClick={() => {
                            setOpenDelete(true)
                            setSelectedPassword(item)
                          }} className="text-neutral-600 p-2 hover:bg-lime-100 hover:text-red-500 transition-colors duration-300 cursor-pointer rounded-lg group relative">
                            <span className='absolute bottom-6 left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300'>Delete</span>
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
      {open && <AddPassword onClose={() => setOpen(false)} />}
      {openEdit && <EditPasswordDetails onClose={() => setOpenEdit(false)} password={selectedPassword} />}
      {openDelete && <ConfirmDelete onClose={() => setOpenDelete(false)} password={selectedPassword} />}
    </>
  )
}

export default Dashboard

const SkeletonDashboard = () => {
  return (
    <Layout>
      <div className="mx-auto bg-gray-100 flex flex-col space-y-5 animate-pulse">

        {/* Header */}
        <div className="flex items-center justify-between w-full py-6">
          <div className="space-y-2">
            <div className="h-6 w-64 bg-gray-300 rounded"></div>
            <div className="h-4 w-40 bg-gray-300 rounded"></div>
          </div>
          <div className="h-8 w-32 bg-gray-300 rounded-lg"></div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="border rounded-lg bg-white p-5 space-y-3">
              <div className="h-8 w-8 bg-gray-300 rounded-lg"></div>
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-6 w-16 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>

        {/* Title + filter */}
        <div className="flex items-center gap-4 mt-4">
          <div className="h-6 w-40 bg-gray-300 rounded"></div>
          <div className="h-10 w-40 bg-gray-300 rounded-lg"></div>
        </div>

        {/* Table */}
        <div className="border rounded-lg bg-white p-5 space-y-4">
          <div className="flex justify-between">
            <div className="h-5 w-40 bg-gray-300 rounded"></div>
            <div className="h-6 w-20 bg-gray-300 rounded"></div>
          </div>

          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="flex items-center justify-between border-t pt-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-gray-300 rounded-lg"></div>
                <div className="h-4 w-40 bg-gray-300 rounded"></div>
              </div>
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-gray-300 rounded"></div>
                <div className="h-8 w-8 bg-gray-300 rounded"></div>
                <div className="h-8 w-8 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </Layout>
  )
}