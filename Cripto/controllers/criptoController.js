import { criptoService } from "../services/criptoService.js"

export class criptoController {

    static async getAll(req, res) {
        let result = await criptoService.getAllCryptos()
        
        if (result.success) {
            return res.status(200).json(result.data);
        } else {
            return res.status(400).json({ error: 'Algo salió mal' });
        }

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

        const cryptoId = req.params.id;
        const update = req.body

        const result = await criptoService.updateCrypto(cryptoId, update)

        if (result.success) {
            return res.status(200).json(result.data);
        } else {
            return res.status(400).json({ error: 'Algo salió mal' });
        }

    }


}