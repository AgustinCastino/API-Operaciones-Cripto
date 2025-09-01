import { CryptoValidation } from "../Errors/cryptoErrors.js"
import { handleError } from '../utils/handleError.js'


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
            return handleError(res, e)
        }
    }

    static async updateCrypto(req, res) {

        const cryptoId = req.params.id;
        const update = req.body

        try{
            await criptoService.updateCrypto(cryptoId, update)
            return res.status(200).json(update);
        }catch(e){
            return handleError(res, e)

        }
    }

    static async deleteCrypto(req, res) {
        const cryptoId = req.params.id;

        try{
            const cryptoDeleted = await criptoService.deleteCrypto(cryptoId)
            return res.status(200).json(cryptoDeleted)
        }catch(e){
            return handleError(res, e)
        }

    }

}