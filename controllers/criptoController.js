import { CryptoValidation } from "../Errors/cryptoErrors.js"
import { criptoService } from "../services/criptoService.js"
import { DbError } from '../Errors/dbErrors.js'

export class criptoController {

    static async getAll(req, res) {
        const cryptos = await criptoService.getAllCryptos()
        return res.status(200).json(cryptos)
    }

    static async newCrypto(req, res) {
        const crypto = req.body

        try {
            await criptoService.newCrypto(crypto)
            return res.status(200).json(crypto)
        } catch (e) {
            return criptoController.handleError(res, e)
        }
    }

    static async updateCrypto(req, res) {

        const cryptoId = req.params.id;
        const update = req.body

        try{
            await criptoService.updateCrypto(cryptoId, update)
            return res.status(200).json(update);
        }catch(e){
            return criptoController.handleError(res, e)

        }
    }

    static async deleteCrypto(req, res) {
        const cryptoId = req.params.id;

        try{
            const cryptoDeleted = await criptoService.deleteCrypto(cryptoId)
            return res.status(200).json(cryptoDeleted)
        }catch(e){
            return criptoController.handleError(res, e)
        }

    }

    static handleError(res, error) {
        if (error instanceof CryptoValidation) {
            return res.status(400).json({ error: error.message })
        }

        if (error instanceof DbError) {
            return res.status(500).json({ error: error.message })
        }

        console.error('Error inesperado:', error)
        return res.status(500).json({ error: 'Error interno del servidor' })
    }


}