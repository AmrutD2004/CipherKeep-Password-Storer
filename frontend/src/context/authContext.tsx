import { googleAuth, isAuthenticated, logout, userData } from "@/api/endpoint";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<any | null>(null)

type props = {
    children: React.ReactNode
}
export const AuthContextProvider = ({ children }: props) => {

    const [userInfo, setUserInfo] = useState<any | null>(null)
    const [userPic, setUserPic] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [authChecked, setAuthChecked] = useState(false)


    const googleResponse = async (auth: any) => {
        setGoogleLoading(true)

        try {
            const data = await googleAuth(auth)
            if (data.success) {
                setUserInfo(data.user)
                if (data.picture && data.picture !== userPic) {
                    setUserPic(data.picture)
                    localStorage.setItem("userPic", data.picture)
                }
                setLoggedIn(true)
                setIsSuccess(data.success)
                localStorage.setItem("userInfo", JSON.stringify(data.user))
                if (data.picture) {
                    localStorage.setItem("userPic", data.picture)
                }
            }
        } catch (err) {
            console.error(err)
            setGoogleLoading(false)
        } finally {
            setGoogleLoading(false)
        }
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("userInfo");
        const storedPic = localStorage.getItem("userPic");

        if (storedUser) {
            setUserInfo(JSON.parse(storedUser));
            setLoggedIn(true);
        }

        if (storedPic) {
            setUserPic(storedPic);
        }
    }, []);

    const isauth = async () => {
        try {
            const data = await isAuthenticated()
            if (data.success) {

                setLoggedIn(true)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setAuthChecked(true)
        }
    }
    useEffect(() => {
        isauth()
    }, [])

    const fetchUserData = async () => {
        const data = await userData()
        if (data.success) {
            setUserInfo(data.user)
        }
    }
    useEffect(() => {
        fetchUserData()
    }, [isLoggedIn])

    const userLogout = async () => {
        const data = await logout()
        if (data.success) {
            toast.success(data.message || 'Logout successfull', {
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
            localStorage.clear()
            window.location.reload()
        }
    }

    return (
        <AuthContext.Provider value={{ userInfo, googleResponse, userPic, googleLoading, setGoogleLoading, isLoggedIn, setLoggedIn, isSuccess, isauth, authChecked, userLogout }}>
            {children}
        </AuthContext.Provider>
    )
}