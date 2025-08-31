import { tradeService } from "../services/tradeService.js"
import { TradeValidation } from "../Errors/tradeErrors.js"
import { DbError } from '../Errors/dbErrors.js'


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
            return tradeController.handleError(res, e)
        }

    }

    static async updateTrade(req, res) {
        const tradeId = req.params.id;
        const update = req.body

        try {
            await tradeService.updateTrade(tradeId, update)
            return res.status(200).json(update)

        } catch (e) {
            return tradeController.handleError(res, e)
        }
    }

    static async deleteTrade(req, res) {
        const tradeId = req.params.id;

        try {
            const tradeDeleted = await criptoService.deleteTrade(tradeId)
            return res.status(200).json(tradeDeleted);
        } catch (e) {
            return tradeController.handleError(res, e)
        }
    }

    static handleError(res, error) {
        if (error instanceof TradeValidation) {
            return res.status(400).json({ error: error.message })
        }

        if (error instanceof DbError) {
            return res.status(500).json({ error: error.message })
        }

        console.error('Error inesperado:', error)
        return res.status(500).json({ error: 'Error interno del servidor' })
    }


}