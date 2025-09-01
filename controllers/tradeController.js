import { tradeService } from "../services/tradeService.js"
import { handleError } from '../utils/handleError.js'

export class tradeController {

    static async getAll(req, res) {
        const trades = await tradeService.getAllTrades()
        return res.status(200).json(trades);

    }

    static async newTrade(req, res) {
        const trade = req.body

        try {
            await tradeService.newTrade(trade)
            return res.status(200).json(result.data);
        } catch (e) {
            return handleError(res, e)
        }

    }

    static async updateTrade(req, res) {
        const tradeId = req.params.id;
        const update = req.body

        try {
            await tradeService.updateTrade(tradeId, update)
            return res.status(200).json(update)

        } catch (e) {
            return handleError(res, e)
        }
    }

    static async deleteTrade(req, res) {
        const tradeId = req.params.id;

        try {
            const tradeDeleted = await criptoService.deleteTrade(tradeId)
            return res.status(200).json(tradeDeleted);
        } catch (e) {
            return handleError(res, e)
        }
    }
}