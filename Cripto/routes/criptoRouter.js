import { Router } from 'express'
import { criptoController } from '../controllers/criptoController.js'


export const criptoRouter = Router()

// GET
criptoRouter.get('/', criptoController.getAll)

// POST
criptoRouter.post('/', criptoController.newCripto)

// PATCH
criptoRouter.patch('/:id', criptoController.updateCripto)
