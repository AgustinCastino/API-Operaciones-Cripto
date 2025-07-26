import { tradeService } from "../services/tradeService.js"



export class tradeController {

    static async getAll(req, res) {
        let result = await tradeService.getAllTrades()

        if (result.success) {
            return res.status(200).json(result.data);
        } else {
            return res.status(400).json({ error: result.error });
        }
    }

    static async newTrade(req, res) {
        const trade = req.body

        const result = await tradeService.newTrade(trade)

        if (result.success) {
            return res.status(200).json(result.data);
        } else {
            return res.status(400).json({ error: result.error });
        }

    }

    static async updateTrade(req, res) {
        const tradeId = req.params.id;
        const update = req.body

        const result = await tradeService.updateTrade(tradeId, update)

        if (result.success) {
            return res.status(200).json(result.data);
        } else {
            return res.status(400).json({ error: result.error });
        }
    }

    static async deleteTrade(req, res) {
        const tradeId = req.params.id;

        const result = await criptoService.deleteTrade(tradeId)

        if (result.success) {
            return res.status(200).json(result.data);
        } else {
            return res.status(400).json({ error: result.error });
        }

    }


}