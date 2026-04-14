import { getUserPasswords } from "@/api/endpoint";
import { createContext, useEffect, useState } from "react";

export const PasswordContext = createContext<any | null>(null)


export const PasswordContextProvider = ({children} : {children: React.ReactNode})=>{

    const [usersPasswords, setUsersPasswords] = useState<any | []>([])
    const [fetchLoading, setFetchLoading] = useState<boolean>(false)

    const fetchUserPasswords = async()=>{
        setFetchLoading(true)
        try{
            const data = await getUserPasswords()
        if(data.success){
            setUsersPasswords(data.data)
        }
        }catch(err){
            console.error(err)
            setFetchLoading(false)
         }
        finally{
            setFetchLoading(false)
        }
    }

    useEffect(()=>{
        fetchUserPasswords()
    }, [])

    return(
        <PasswordContext.Provider value={{
            usersPasswords, fetchUserPasswords, fetchLoading
        }}>
            {children}
        </PasswordContext.Provider>
    )
}