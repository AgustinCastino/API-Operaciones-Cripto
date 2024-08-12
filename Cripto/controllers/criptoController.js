import { criptoModel } from "../models/cripto.js"
import { validarOperacion, validarOperacionParcial} from "../schema/operacion.js"


export class criptoController {

    static async getAll(req, res) {
        const criptos = await criptoModel.getAll()
        res.json(criptos)
        
    }

    static async getCompras(req, res) {
        const compras = await criptoModel.getCompras()
        res.json(compras)
    }

    static async getVentas(req, res) {
        const ventas = await criptoModel.getVentas()
        res.json(ventas)

    }

    static async crearOperacion(req, res) {

        // Todo -  Se debería validar que req.body sea valido para crear una operacion

        const validacion = validarOperacion(req.body)

        if (!validacion.success){
            return res.status(400).json({ error: JSON.parse(validacion.error.message) })
        }
        
        const operacionCreada = await criptoModel.crearOperacion(req.body)
        
        res.json(operacionCreada)

    }

    static async actualizarOperacion(req, res) {

        const id = req.params.id

        // Todo - Se deberia validar la data
        const data = req.body

        const operacionActualizada = await criptoModel.actualizarOperacion(id, data)

        res.json(operacionActualizada)

    }

    
}