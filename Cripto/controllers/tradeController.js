import { tradeService } from "../services/trade.js"
import { validarOperacion, validarOperacionParcial} from "../schema/operacion.js"


export class tradeController {

    static async getAll(req, res) {
        try{
            const criptos = await tradeService.getAll()
            res.json(criptos)
        }catch{
            console.error('Error getAll', err)
        }
    }

    static async getFilteredCripto(req, res){
        try{
            const cripto = req.params.cripto 
            const filteredCripto = await tradeService.getFilteredCripto(cripto);
        
            res.json(filteredCripto);
        }catch(err){
            console.error('Error en getFilteredCripto', err)
        }
            
    }

    static async getCompras(req, res) {
        console.log("ok")
        try{
            const compras = await tradeService.getCompras()
            res.json(compras)
        }catch{
            console.error('Error en getCompras', err)
        }
    }

    static async getVentas(req, res) {
        try{
            const ventas = await tradeService.getVentas()
            res.json(ventas)
        }catch{
            console.error('Error getVentas', err);
            
        }
    }

    static async newTrade(req, res) {
        try{
            const validacion = validarOperacion(req.body)
    
            if (!validacion.success){
                return res.status(400).json({ error: JSON.parse(validacion.error.message) })
            }
            
            const operacionCreada = await tradeService.newTrade(req.body)
            
            res.json(operacionCreada)
        }catch{
            console.error('Error crearOperacion', err);
        }

    }

    static async updateTrade(req, res) {
        try{
            const id = req.params.id
    
            const validacion = validarOperacionParcial(req.body)
    
            if (!validacion.success){
                return res.status(400).json({ error: JSON.parse(validacion.error.message) })
            }
    
            const operacionActualizada = await tradeService.updateTrade(id, validacion.data)
    
            res.json(operacionActualizada)
        }catch{
            console.error('Error actualizarOperacion', err);
            
        }
    }

    
}