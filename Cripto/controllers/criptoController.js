import { criptoService } from "../services/criptoService.js"
import { validarCripto, validarCriptoParcial } from "../schema/cripto.js"


export class criptoController {

    static async getAll(req, res) {
        return null
    }

    static async newCrypto(req, res) {
        const crypto = req.body

        const result = await criptoService.newCrypto(crypto)

        if (result.success) {
            return res.status(200).json(result.data);
        } else {
            return res.status(400).json({ error: 'Algo salió mal' });
        }
    }

    static async updateCrypto(req, res) {

    }


}