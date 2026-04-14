import { Eye, EyeClosed, Loader2 } from 'lucide-react'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { userLogin, userRegister } from '../api/endpoint.ts'
import toast from 'react-hot-toast'
import GoogleLoginn from '@/components/GoogleLogin.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContext } from '@/context/authContext.tsx'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID
    const { isLoggedIn, setLoggedIn, isSuccess, isauth } = useContext(AuthContext)
    const navigate = useNavigate()
    const [operation, setOperation] = useState('signup')
    const [seePassword, setSeePassword] = useState(false)
    const [signUpLoading, setSignupLoading] = useState(false)
    const [signInLoading, setSigninLoading] = useState(false)
    const [signUp, setSignUp] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })
    const [signIn, setSignIn] = useState({
        username: "",
        password: ""
    })

    const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target
        setSignUp(prev => ({ ...prev, [name]: value }))
    }
    const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target
        setSignIn(prev => ({ ...prev, [name]: value }))
    }

    const handleRegister = async (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault()

        try {
            setSignupLoading(true)
            const payload = {
                username: signUp.username,
                firstname: signUp.firstname,
                lastname: signUp.lastname,
                email: signUp.email,
                password: signUp.password
            }
            const data = await userRegister(payload)
            if (data.success) {
                toast.success('User Register Successfully', {
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

                setSignUp({
                    username: "",
                    firstname: "",
                    lastname: "",
                    email: "",
                    password: ""
                })
                setTimeout(() => {
                    setOperation('signin')
                }, 2000)
            }

        } catch (error: any) {
            console.log(error.message)
        } finally {
            setSignupLoading(false)
        }
    }

    const handleLogin = async (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault()

        try {
            setSigninLoading(true)
            const payload = {
                username: signIn.username,
                password: signIn.password
            }
            const data = await userLogin(payload)
            console.log(data)
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
                setSignIn({
                    username: "",
                    password: ""
                })
                isauth()
                setTimeout(() => {
                    navigate('/dashboard')
                }, 2000)
            }
            else {
                toast.error(data.message, {
                    style: {
                        backgroundColor: '#FEF2F2',
                        color: '#991B1B',
                        fontSize: '14px',
                        fontWeight: '500',
                        padding: '10px 16px',
                        boxShadow: '0 4px 16px rgba(220,38,38,0.12)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    },
                    icon: (
                        <div style={{
                            backgroundColor: '#DC2626',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 2L10 10M10 2L2 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    ),
                    duration: 3000,
                })

            }

        } catch (error: any) {
            console.log(error.message)
        } finally {
            setSigninLoading(false)
        }
    }

    useEffect(() => {
        if (isSuccess) {
            navigate('/dashboard')
        }
    }, [isSuccess])

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin()
        }
    }

    return (
        <div className='max-w-7xl mx-auto '>
            <div className='flex items-center justify-center min-h-screen'>
                <div className='px-5 py-3 border rounded-lg shadow w-100 flex flex-col gap-5 items-center justify-center'>
                    <label className='font-semibold tracking-tight text-lime-500 text-2xl text-shadow-sm '>CipherKeep</label>
                    <div className='w-full  flex items-center justify-between border rounded-lg overflow-hidden py-2 bg-gray-100'>
                        <button onClick={() => setOperation('signup')} className={`w-full font-semibold tracking-tight mx-2 py-1  rounded-lg text-neutral-700 text-sm ${operation === 'signup' && 'bg-lime-400'}`}>Sign Up</button>
                        <button onClick={() => setOperation('signin')} className={`w-full font-semibold tracking-tight mx-2 py-1  rounded-lg text-neutral-700 text-sm ${operation === 'signin' && 'bg-lime-400'}`}>Sign In</button>
                    </div>
                    <div className='flex flex-col items-start justify-start gap-4 w-full'>
                        {operation === "signup" && (
                            <form onSubmit={handleRegister} className='w-full flex flex-col space-y-4'>
                                <div className='flex flex-col items-start justify-start gap-1 w-full'>
                                    <label className='text-sm font-semibold text-neutral-600 tracking-tight'>Username</label>
                                    <input onChange={handleSignUpChange} type="text" name='username' value={signUp.username} className='w-full px-3 py-1 text-sm border border-neutral-300 rounded-lg placeholder:text-xs outline-none' placeholder='Enter Username' />
                                </div>
                                <div className='flex flex-col items-start justify-start gap-1 w-full'>
                                    <label className='text-sm font-semibold text-neutral-600 tracking-tight'>Firstname</label>
                                    <input onChange={handleSignUpChange} type="text" name='firstname' value={signUp.firstname} className='w-full px-3 py-1 text-sm border border-neutral-300 rounded-lg placeholder:text-xs outline-none' placeholder='Enter Firstname' />
                                </div>
                                <div className='flex flex-col items-start justify-start gap-1 w-full'>
                                    <label className='text-sm font-semibold text-neutral-600 tracking-tight'>Lastname</label>
                                    <input onChange={handleSignUpChange} type="text" name='lastname' value={signUp.lastname} className='w-full px-3 py-1 text-sm border border-neutral-300 rounded-lg placeholder:text-xs outline-none' placeholder='Enter Lastname' />
                                </div>
                                <div className='flex flex-col items-start justify-start gap-1 w-full'>
                                    <label className='text-sm font-semibold text-neutral-600 tracking-tight'>email</label>
                                    <input onChange={handleSignUpChange} type="text" name='email' value={signUp.email} className='w-full px-3 py-1 text-sm border border-neutral-300 rounded-lg placeholder:text-xs outline-none' placeholder='Enter Email' />
                                </div>
                                <div className='flex flex-col items-start justify-start gap-1 w-full relative'>
                                    <label className='text-sm font-semibold text-neutral-600 tracking-tight'>Password</label>
                                    <input onChange={handleSignUpChange} type={`${seePassword ? 'text' : 'password'}`} name='password' value={signUp.password} className='w-full px-3 py-1 text-sm border border-neutral-300 rounded-lg placeholder:text-xs outline-none' placeholder='Enter Password' />
                                    <button type='button' onClick={() => setSeePassword(!seePassword)} className='absolute right-3 bottom-1.5 text-neutral-500 cursor-pointer'>{seePassword ? <EyeClosed size={16} /> : <Eye size={16} />}</button>
                                </div>
                                <div className='w-full my-3 text-sm flex items-center justify-center '>
                                    {signUpLoading ? <button disabled className='py-2 rounded-lg cursor-pointer font-semibold text-neutral-500 tracking-tight  bg-lime-200 w-full flex items-center justify-center gap-1'><Loader2 className="animate-spin " size={16} />Signing Up...</button>
                                        :
                                        <button type='submit' className='py-2 rounded-lg cursor-pointer font-semibold text-neutral-800 tracking-tight drop-shadow-lg drop-shadow-lime-200 bg-lime-300 w-full flex items-center justify-center'>Sign Up</button>}
                                </div>
                                <GoogleOAuthProvider clientId={clientID}>
                                    <GoogleLoginn text='Continue with google' />
                                </GoogleOAuthProvider>
                                <div className='flex items-center gap-1 text-sm justify-center w-full font-semibold text-neutral-500'><span>Already have account?</span><button className='underline text-lime-500 cursor-pointer' onClick={() => setOperation('signin')}>Sign In</button> </div>

                            </form>
                        )}
                        {operation === "signin" && (
                            <form onSubmit={handleLogin} className='w-full flex flex-col space-y-3'>
                                <div className='flex flex-col items-start justify-start gap-1 w-full'>
                                    <label className='text-sm font-semibold text-neutral-600 tracking-tight'>Username</label>
                                    <input onChange={handleSignInChange} type="text" name='username' value={signIn.username} className='w-full px-3 py-1 text-sm border border-neutral-300 rounded-lg placeholder:text-xs outline-none' placeholder='Enter Username' />
                                </div>

                                <div className='flex flex-col items-start justify-start gap-1 w-full relative'>
                                    <label className='text-sm font-semibold text-neutral-600 tracking-tight'>Password</label>
                                    <input onChange={handleSignInChange} type={`${seePassword ? 'text' : 'password'}`} name='password' value={signIn.password} className='w-full px-3 py-1 text-sm border border-neutral-300 rounded-lg placeholder:text-xs outline-none' placeholder='Enter Password' />
                                    <button type='button' onClick={() => setSeePassword(!seePassword)} className='absolute right-3 bottom-1.5 text-neutral-500 cursor-pointer'>{seePassword ? <EyeClosed size={16} /> : <Eye size={16} />}</button>
                                </div>
                                <div className='w-full my-3 text-sm flex items-center justify-center '>
                                    {signInLoading ? <button disabled className='py-2 rounded-lg cursor-pointer font-semibold text-neutral-500 tracking-tight  bg-lime-200 w-full flex items-center justify-center gap-1'><Loader2 className="animate-spin " size={16} />Signing In...</button>
                                        :
                                        <button
                                            className='py-2 rounded-lg cursor-pointer font-semibold text-neutral-800 tracking-tight drop-shadow-lg drop-shadow-lime-200 bg-lime-300 w-full flex items-center justify-center'>Sign In</button>}
                                </div>
                                <GoogleOAuthProvider clientId={clientID}>
                                    <GoogleLoginn text='Login with google' />
                                </GoogleOAuthProvider>
                                <div className='flex items-center gap-1 text-sm justify-center w-full font-semibold text-neutral-500'><span>Don't have account?</span><button className='underline text-lime-500 cursor-pointer' onClick={() => setOperation('signup')}>Sign Up</button> </div>
                            </form>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth