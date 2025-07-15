import { Router } from 'express'
import { tradeController } from '../controllers/tradeController.js'


export const tradeRouter = Router()

// GET
tradeRouter.get('/', tradeController.getAll)

// POST
tradeRouter.post('/', tradeController.newTrade)

// PATCH
tradeRouter.patch('/:id', tradeController.updateTrade)

// DELETE
tradeRouter.delete(':id', tradeController.deleteTrade)
