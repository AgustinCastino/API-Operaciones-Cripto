import { Router } from 'express'
import { tradeController } from '../controllers/tradeController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'


export const tradeRouter = Router()

// GET
tradeRouter.get('/', authMiddleware,tradeController.getAll)

// POST
tradeRouter.post('/', authMiddleware,tradeController.newTrade)

// PATCH
tradeRouter.patch('/:id', authMiddleware,tradeController.updateTrade)

// DELETE
tradeRouter.delete(':id', authMiddleware,tradeController.deleteTrade)
