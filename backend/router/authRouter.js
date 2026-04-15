import express from 'express'
import { getUserData, googleAuth, isAuthenticated, login, logout, register, updateUserDetails } from '../controller/userController.js'
import { userAuth } from '../middleware/userAuth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/google', googleAuth)
router.get('/is-authenticated', userAuth , isAuthenticated)
router.get('/getUserData', userAuth , getUserData)
router.put('/updateUserdetails', userAuth , updateUserDetails)

export default router