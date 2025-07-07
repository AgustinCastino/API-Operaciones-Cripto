import { Router } from 'express'
import { tradeController } from '../controllers/tradeController.js'


export const tradeRouter = Router()

// GET
tradeRouter.get('/', tradeController.getAll)
tradeRouter.get('/compras', tradeController.getCompras)
tradeRouter.get('/ventas', tradeController.getVentas)

// GET con Filtros
tradeRouter.get('/:cripto', tradeController.getFilteredCripto)

// POST
tradeRouter.post('/', tradeController.newTrade)

// PATCH
tradeRouter.patch('/:id', tradeController.updateTrade)
