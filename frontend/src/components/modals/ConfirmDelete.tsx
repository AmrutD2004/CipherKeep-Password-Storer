import { deletePassword } from '@/api/endpoint'
import { Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
    onClose: () => void
    password: any
}

const ConfirmDelete = ({ onClose, password }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)

    const handleDelete = async (id: number) => {
        setLoading(true)
        try {
            const data = await deletePassword(id)
            if (data.success) {
                toast.success(data.message || 'Password Deleted successfully', {
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
        }finally{
            setLoading(false)
        }
    }
    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">

            {/* Modal Box */}
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">

                {/* Title */}
                <h2 className="text-lg font-semibold text-neutral-800">
                    Delete Password
                </h2>

                {/* Message */}
                <p className="text-sm text-neutral-500 mt-2">
                    Are you sure you want to delete this password? This action cannot be undone.
                </p>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">

                    {/* Cancel */}
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm rounded-lg border border-neutral-300 text-neutral-600 hover:bg-gray-100 transition cursor-pointer"
                    >
                        Cancel
                    </button>

                    {/* Confirm */}
                    <button
                        disabled={loading}
                        onClick={() => handleDelete(password.cred_id)}
                        className={`px-4 py-2 text-sm rounded-lg  text-white  transition flex items-center gap-1 ${loading ? 'cursor-not-allowed bg-red-800 transi' : 'cursor-pointer bg-red-500 hover:bg-red-600'}`}
                    >
                        {loading ? 'Deleteing...' : 'Delete'}
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ConfirmDelete