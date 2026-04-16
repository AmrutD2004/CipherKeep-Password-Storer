import axios from 'axios'


const api = axios.create({
    baseURL : import.meta.env.VITE_BASE_URL,
    withCredentials : true
})

export const userRegister = async(payload: any)=>{
    const response = await api.post(`user/auth/register`, payload)
    return response.data
}

export const userLogin = async(payload: any)=>{
    const response = await api.post(`user/auth/login`, payload)
    return response.data
}

export const googleAuth = async(code:any)=>{
    const response = await api.post(`user/auth/google`, {code})
    return response.data
}

export const isAuthenticated = async()=>{
    const response = await api.get(`user/auth/is-authenticated`)
    return response.data
}

export const userData = async()=>{
    const response = await api.get(`user/auth/getUserData`)
    return response.data
}

export const logout = async()=>{
    const response = await api.post(`user/auth/logout`)
    return response.data
}

export const addPassword = async(payload : {})=>{
    const response = await api.post(`user/password/addPassword`, payload)
    return response.data
}

export const getUserPasswords = async()=>{
    const response = await api.get(`user/password/getUserPasswords`)
    return response.data
}

export const editPasswords = async(payload : {})=>{
    const response = await api.put(`user/password/editPassword`, payload)
    return response.data
}

export const deletePassword = async(id:number)=>{
    const response = await api.delete(`user/password/deletePassword/${id}`)
    return response.data
}


export const updateUserDetials = async(payload : {})=>{
    const response = await api.put(`user/auth/updateUserdetails`, payload)
    return response.data
}

