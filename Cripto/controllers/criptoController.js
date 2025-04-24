import { criptoModel } from "../models/cripto.js"
import { validarOperacion, validarOperacionParcial} from "../schema/operacion.js"


export class criptoController {

    static async getAll(req, res) {
        try{
            const criptos = await criptoModel.getAll()
            res.json(criptos)
        }catch{
            console.error('Error getAll', err)
        }
    }

    static async getFilteredCripto(req, res){
        try{
            const cripto = req.params.cripto 
            const filteredCripto = await criptoModel.getFilteredCripto(cripto);
        
            res.json(filteredCripto);
        }catch{
            console.error('Error en getFilteredCripto', err)
        }
            
    }

    static async getCompras(req, res) {
        try{
            const compras = await criptoModel.getCompras()
            res.json(compras)
        }catch{
            console.error('Error en getCompras', err)
        }
    }

    static async getVentas(req, res) {
        try{
            const ventas = await criptoModel.getVentas()
            res.json(ventas)
        }catch{
            console.error('Error getVentas', err);
            
        }
    }

    static async crearOperacion(req, res) {
        try{
            const validacion = validarOperacion(req.body)
    
            if (!validacion.success){
                return res.status(400).json({ error: JSON.parse(validacion.error.message) })
            }
            
            const operacionCreada = await criptoModel.crearOperacion(req.body)
            
            res.json(operacionCreada)
        }catch{
            console.error('Error crearOperacion', err);
        }

    }

    static async actualizarOperacion(req, res) {
        try{
            const id = req.params.id
    
            const validacion = validarOperacionParcial(req.body)
    
            if (!validacion.success){
                return res.status(400).json({ error: JSON.parse(validacion.error.message) })
            }
    
            const operacionActualizada = await criptoModel.actualizarOperacion(id, validacion.data)
    
            res.json(operacionActualizada)
        }catch{
            console.error('Error actualizarOperacion', err);
            
        }
    }

    
}