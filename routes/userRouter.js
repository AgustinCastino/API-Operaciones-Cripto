import { Router } from 'express'
import { userController } from '../controllers/userController.js'


export const userRouter = Router()

// POST
userRouter.get('/login', userController.login)
userRouter.post('/logout', userController.logout)
userRouter.post('/register', userController.register)