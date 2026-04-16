import Layout from '@/components/Layout/Layout'
import ConfirmDelete from '@/components/modals/ConfirmDelete'
import EditPasswordDetails from '@/components/modals/EditPasswordDetails'
import { PasswordContext, PasswordContextProvider } from '@/context/passwordContext'
import dayjs from 'dayjs'
import { ArrowLeft, ArrowRight } from 'iconsax-reactjs'
import { Copy, Edit, Edit2, LayoutGrid, List, Search, Trash2 } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Vault = () => {
  const { usersPasswords, fetchLoading } = useContext(PasswordContext)
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [layout, setLayout] = useState<string>('grid')
  const category = ['Social', 'Banking', 'Work', 'Entertainment', 'Others']

  const [searchPassword, setSearchPassword] = useState([])
  const [selectedPassword, setSelectedPassword] = useState<any | null>(null)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)

  useEffect(() => {
    setSearchPassword(usersPasswords)
  }, [usersPasswords])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.toLowerCase()
    if (!keyword) {
      setSearchPassword(usersPasswords)
      return
    }
    const filtered = usersPasswords.filter((f: any) => f.website?.toLowerCase().includes(keyword))
    setSearchPassword(filtered)
  }
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
  const handleCategorySearch = (item: string) => {
    const keyword = item.toLowerCase()

    const filtered = usersPasswords.filter((f: any) =>
      f.category?.toLowerCase() === keyword
    )

    setSearchPassword(filtered)
  }

  const [currentPage, setCurrentPage] = useState<number>(0)
  const PAGE_SIZE = 6
  const totalPassword = searchPassword.length
  const noOfPages = Math.ceil(totalPassword / PAGE_SIZE)
  const start = currentPage * PAGE_SIZE
  const end = start + PAGE_SIZE
  const handlePage = (n:number) => {
    setCurrentPage(n)
  }
  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const goToPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const visibleNumber = [...Array(noOfPages).keys()].slice(Math.max(0, currentPage - 1), Math.min(noOfPages, currentPage + 2))

  const isLoading = fetchLoading

  if (isLoading) {
    return (
      <SkeletonDashboard />
    )
  }

  return (
    <>
      <Layout>
        <div className='bg-gray-100 flex flex-col space-y-3 lg:space-y-5 3xl:max-w-7xl overflow-hidden px-3 lg:px-0'>
          <div className='w-full flex items-center justify-between pe-5 py-4'>
            <div className='flex items-center justify-start gap-4'>
              <h1 className='text-2xl tracking-tight leading-tight text-start'>My Vault</h1>
              <span className='text-lime-500 px-2 font-semibold text-sm rounded-full bg-lime-100 border border-lime-500'>{usersPasswords.length}</span>
            </div>
            <div className='flex items-center justify-end gap-4'>
              <button onClick={() => setLayout('grid')} className={` p-2 rounded-lg  cursor-pointer transition-colors duration-200 ${layout === 'grid' ? 'text-lime-500 bg-lime-200' : 'text-neutral-500 hover:bg-gray-200'}`}><LayoutGrid size={18} /></button>
              <button onClick={() => setLayout('list')} className={` p-2 rounded-lg  cursor-pointer transition-colors duration-200 ${layout === 'list' ? 'text-lime-500 bg-lime-200' : 'text-neutral-500 hover:bg-gray-200'}`}><List size={18} /></button>
            </div>
          </div>
          <div className='w-full flex flex-col items-start justify-start gap-1 lg:px-5 py-3 relative'>
            <Search size={16} className='absolute top-[19px] left-3 lg:left-7 text-neutral-500 outline-none' />
            <input onChange={(e) => handleSearch(e)} type='text' className='w-full bg-white px-8 py-1 text-sm font-normal rounded-lg border border-neutral-300' placeholder='Search Password' />
          </div>
          <div className='hidden lg:flex mx-5 gap-5 leading-tight'>
            <button onClick={() => {
              setSearchPassword(usersPasswords)
              setActiveCategory('')
            }} className={`flex px-3 py-0.5 text-xs rounded-full  cursor-pointer ${activeCategory === '' ? 'bg-lime-500 text-white border border-lime-700' : 'bg-white border border-neutral-300'}`}>ALL</button>
            {category.map((item, idx) => (
              <button key={idx} onClick={() => {
                handleCategorySearch(item)
                setActiveCategory(item)
              }} className={`flex px-3 py-0.5 text-xs rounded-full  cursor-pointer ${activeCategory === item ? 'bg-lime-500 text-white border border-lime-600' : 'bg-white border border-neutral-300'}`}>{item}</button>
            ))}
          </div>

          {layout === 'list' && (

            <div className='px-5 py-4 w-full border border-neutral-300 rounded-lg bg-white shadow overflow-x-auto'>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className="border-t border-b bg-gray-50 ">
                    <th className="text-left text-sm text-neutral-500 font-medium py-3 px-4">Website</th>
                    <th className="text-left text-sm text-neutral-500 font-medium py-3 px-4">Username / Email</th>
                    <th className="text-left text-sm text-neutral-500 font-medium py-3 px-4">Created At</th>
                    <th className="text-center text-sm text-neutral-500 font-medium py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {searchPassword.slice(start, end).map((item: any) => (
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
          )}

          {layout === 'grid' && (
            <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-3 '>
              {searchPassword.map((item: any) => (
                <div key={item.cred_id} className='border border-neutral-300 px-5 py-3 bg-white rounded-lg shadow  group w-full hover:scale-102 transition-all duration-300'>
                  <div className='w-full flex flex-col items-start justify-start gap-2'>
                    <div className='flex flex-col lg:flex-row items-center w-full  gap-2'>
                      <div className='flex items-center gap-3 w-full'>
                        <span className='py-1 px-3 text-lime-500 bg-lime-200 rounded-lg'>{item?.website?.[0]}</span>
                        <div className='flex flex-col items-start justify-start leading-tight'>
                          <h1 className='tracking-tight text-neutral-800'>{item.website}</h1>
                          <span className='text-sm text-neutral-500 font-normal'>{item.usernameoremail}</span>
                        </div>
                      </div>
                      <div className='flex items-center ms-auto lg:justify-end gap-2 w-full opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <button onClick={() => handleCopy(item.password)} className='text-neutral-500 p-1 hover:bg-lime-100 rounded-lg cursor-pointer hover:text-lime-500 transition-colors duration-200'><Copy size={16} /></button>
                        <button onClick={() => {
                          setOpenEdit(true)
                          setSelectedPassword(item)
                        }} className='text-neutral-500 p-1 hover:bg-lime-100 rounded-lg cursor-pointer hover:text-lime-500 transition-colors duration-200'><Edit size={16} /></button>
                        <button onClick={() => {
                          setOpenDelete(true)
                          setSelectedPassword(item)
                        }} className='text-neutral-500 p-1 hover:bg-lime-100 rounded-lg cursor-pointer hover:text-red-500 transition-colors duration-200'><Trash2 size={16} /></button>
                      </div>
                    </div>
                    <div className='w-full flex items-center justify-between'>
                      <span className='px-3 py-1 leading-tight tracking-tight bg-lime-100 border border-lime-500 text-lime-500 text-xs rounded-full'>{item.category}</span>
                      <span className='text-xs text-neutral-500'>{dayjs(item.created_at).format('YYYY-MM-DD')}</span>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          )}
          <div className="w-full flex items-center justify-center px-2 mt-10">
            <button disabled={currentPage === 0} onClick={() => goToPrevPage()} className={`border px-2 py-1 rounded-lg border-neutral-300 text-neutral-600 me-2 text-xs flex items-center gap-1 ${currentPage === 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:text-neutral-700 hover:font-medium hover:border-lime-400 transition-all duration-300 hover:bg-lime-50'}`}><ArrowLeft size={16} />Prev</button>
            {visibleNumber.map((n) =>
            (
              <button onClick={() => handlePage(n)} className={`px-3 py-1.5 border text-sm border-neutral-300 text-neutral-500 hover:text-neutral-700 hover:font-medium hover:border-lime-400 transition-all duration-300 cursor-pointer hover:bg-lime-50 ${currentPage === n && 'bg-lime-400 font-medium text-black scale-105 border-lime-400'}`} key={n}>{n + 1}</button>
            ))}
            <button disabled={currentPage === noOfPages - 1} onClick={() => goToNextPage()} className={`border px-2 py-1 rounded-lg border-neutral-300 text-neutral-600 ms-2 text-xs flex items-center gap-1 ${currentPage === noOfPages - 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:font-medium hover:border-lime-400 transition-all duration-300 hover:bg-lime-50 hover:text-neutral-700'}`}>Next<ArrowRight size={16} /></button>
          </div>
        </div>
      </Layout>
      {openEdit && <EditPasswordDetails onClose={() => setOpenEdit(false)} password={selectedPassword} />}
      {openDelete && <ConfirmDelete onClose={() => setOpenDelete(false)} password={selectedPassword} />}
    </>
  )
}

export default Vault


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
          <div className='flex gap-2'>
            <div className="h-8 w-8 bg-gray-300 rounded-lg"></div>
            <div className="h-8 w-8 bg-gray-300 rounded-lg"></div>
          </div>
        </div>



        {/* Title + filter */}
        <div className="flex flex-col items-start w-full gap-4 mt-4">
          <div className="h-8 bg-gray-300 rounded w-full"></div>
          <div className="flex gap-5">
            <div className='h-8 w-14 bg-gray-300 rounded-full'></div>
            <div className='h-8 w-14 bg-gray-300 rounded-full'></div>
            <div className='h-8 w-14 bg-gray-300 rounded-full'></div>
            <div className='h-8 w-14 bg-gray-300 rounded-full'></div>
            <div className='h-8 w-14 bg-gray-300 rounded-full'></div>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg bg-white p-5 space-y-4">

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
            <div key={i} className="flex items-center justify-between border-t pt-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-gray-300 rounded-lg"></div>
                <div className="h-4 w-40 bg-gray-300 rounded"></div>
              </div>
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
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
