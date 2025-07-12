import { Router } from 'express'
import { criptoController } from '../controllers/criptoController.js'


export const criptoRouter = Router()

// GET
criptoRouter.get('/', criptoController.getAll)

// POST
criptoRouter.post('/', criptoController.newCrypto)

// PATCH
criptoRouter.patch('/:id', criptoController.updateCrypto)
