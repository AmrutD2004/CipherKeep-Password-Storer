import { AuthContext } from '@/context/authContext'
import React, { useContext } from 'react'

import { Navigate } from 'react-router-dom'

const Protected = ({children}:{children:React.ReactNode}) => {
    const {isLoggedIn, authChecked} = useContext(AuthContext)
     if (!authChecked) {
    return null // or spinner
  }
    if(!isLoggedIn){
      return <Navigate to={'/auth'} replace/>
    }
    return children
}

export default Protected