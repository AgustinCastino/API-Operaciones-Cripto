import { criptoModel } from "../models/cripto.js"
import { validarCripto, validarCriptoParcial} from "../schema/cripto.js"


export class criptoController {

    static async getAll(req, res) {
        return null
    }

    static async newCripto(req, res) {
        cripto = req.body
        cripto = {
            ...req.body,
            lastUpdate: new Date()
        }

        try{
            const validatedCripto = validarCripto(cripto)
            if (!validatedCripto.success){
                return res.status(400).json({ error: JSON.parse(validacion.error.message) })
            }
            const newCripto = await criptoModel.newCripto(cripto)
            
            res.json(newCripto)
        }catch{
            console.error('Error crearOperacion', err);
        }

    }

    static async updateCripto(req, res) {
        
    }

    
}