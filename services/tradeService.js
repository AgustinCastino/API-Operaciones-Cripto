import { tradeModel } from '../models/tradeModel.js'
import { validarTrade, validarTradeParcial } from "../schema/trade.js"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class tradeService {

    static async getAllTrades() {
        try {
            const res = await prisma.trades.findMany()
            let trades = res[0];
            return { success: true, data: trades };
        } catch (error) {
            return { success: false, error };
        }
    }

    static async newTrade(newTrade) {

        newTrade.trade_type = newTrade.trade_type.toUpperCase()

        const validatedTrade = validarTrade(newTrade)
        if (!validatedTrade.success) {
            return { success: false, error: JSON.parse(validatedTrade.error.message) }
        }

        try {
            const tradeCreated = await prisma.trades.create({
            data:{
                trade_type: newTrade.trade_type,
                crypto_amount :newTrade.crypto_amount,
                usdt_amount: newTrade.usdt_amount,
                unit_price:newTrade.unit_price,
                user:{
                    connect: {
                        id:newTrade.user_id
                    }
                },
                crypto:{
                    connect: {
                        id:newTrade.crypto_id
                    }
                }
            }
        })
            return { success: true, data: tradeCreated };
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

        const trade = await prisma.trades.findFirst({
            where: {
                id: id
            }
        })

        if (!trade) {
            return { success: false, error: 'Trade not found' }
        }

        try {
            await prisma.trades.delete({
                where: {
                    id: id
                }
            })
            return { success: true, data: trade };
        } catch (error) {
            return { success: false, error };
        }
    }

}
