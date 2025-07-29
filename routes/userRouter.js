import { Router } from 'express'
import { userController } from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'


export const userRouter = Router()

// GET
userRouter.get('/login',userController.login)

// POST
userRouter.post('/register', userController.register)