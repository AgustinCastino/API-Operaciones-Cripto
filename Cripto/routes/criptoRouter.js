import { Router } from 'express'
import { criptoController } from '../controllers/criptoController.js'


export const criptoRouter = Router()

criptoRouter.get('/', criptoController.getAll)
criptoRouter.get('/compras', criptoController.getCompras)
criptoRouter.get('/ventas', criptoController.getVentas)

criptoRouter.post('/', criptoController.crearOperacion)


criptoRouter.patch('/:id', criptoController.actualizarOperacion)
