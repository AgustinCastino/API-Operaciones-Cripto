import { tradeModel } from '../models/tradeModel.js'
import { validarTrade, validarTradeParcial } from "../schema/trade.js"

export class tradeService {

    static async getAllTrades() {
        try {
            const res = await tradeModel.getAllTrades();
            let trades = res[0];
            return { success: true, data: trades };
        } catch (error) {
            return { success: false, error };
        }
    }

    static async newTrade(trade) {

        trade.trade_type = trade.trade_type.toUpperCase()

        const validatedTrade = validarTrade(trade)
        if (!validatedTrade.success) {
            return { success: false, error: JSON.parse(validatedTrade.error.message) }
        }

        try {
            await tradeModel.newTrade(trade)
            return { success: true, data: trade };
        } catch (error) {
            return { success: false, error };
        }

    }

    static async updateTrade(id, data) {
        const validatedTradeUpdate = validarTradeParcial(data)
        if (!validatedTradeUpdate.success) {
            return { success: false, error: JSON.parse(validatedTradeUpdate.error.message) }
        }

        let trade = await tradeModel.getTradeById(id)
        trade = trade[0]

        if (trade.length == 0) {
            return { success: false, error: 'Trade not found' }
        }

        try {
            const res = await tradeModel.updateTrade(id, data)
            return { success: true, data };
        } catch (error) {
            return { success: false, error };
        }
    }

    static async deleteTrade(id) {
        let trade = await tradeModel.getTradeById(id)

        trade = trade[0]

        if (trade.length == 0) {
            return { success: false, error: 'Trade not found' }
        }

        try {
            const res = await tradeModel.deleteTrade(id)
            return { success: true, data: trade };
        } catch (error) {
            return { success: false, error };
        }
    }

}
