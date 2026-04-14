import express from 'express'
import { userAuth } from '../middleware/userAuth.js'
import { addPassword, deletePassword, editPassword, getUserPasswords } from '../controller/passwordController.js'

const passwordRouter = express.Router()

passwordRouter.post('/addPassword', userAuth, addPassword)
passwordRouter.get('/getUserPasswords', userAuth, getUserPasswords)
passwordRouter.put('/editPassword', userAuth, editPassword)
passwordRouter.delete('/deletePassword/:cred_id', userAuth, deletePassword)
export default passwordRouter