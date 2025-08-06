import { TradeValidation } from "../Errors/tradeErrors.js"
import { validarTrade, validarTradeParcial } from "../schema/trade.js"
import { PrismaClient } from '@prisma/client'
import { DbError } from '../Errors/dbErrors.js'

const prisma = new PrismaClient()

export class tradeService {

    static async getAllTrades() {
        return await prisma.trades.findMany()
    }

    static async newTrade(newTrade) {

        newTrade.trade_type = newTrade.trade_type.toUpperCase()

        const validatedTrade = validarTrade(newTrade)
        if (!validatedTrade.success) {
            throw new TradeValidation(validatedTrade.error.message)
        }

        try {
            const tradeCreated = await prisma.trades.create({
                data: {
                    trade_type: newTrade.trade_type,
                    crypto_amount: newTrade.crypto_amount,
                    usdt_amount: newTrade.usdt_amount,
                    unit_price: newTrade.unit_price,
                    user: {
                        connect: {
                            id: newTrade.user_id
                        }
                    },
                    crypto: {
                        connect: {
                            id: newTrade.crypto_id
                        }
                    }
                }
            })
            return tradeCreated;
        } catch (error) {
            throw new DbError(error)
        }

    }

    static async updateTrade(id, data) {
        const validatedTradeUpdate = validarTradeParcial(data)
        if (!validatedTradeUpdate.success) {
            throw new TradeValidation(validatedTradeUpdate.error.message)
        }

        try {
            await prisma.trades.update({
                where: {
                    id: id
                },
                data: data
            })
            return data;
        } catch (error) {
            throw new DbError(error)
        }
    }

    static async deleteTrade(id) {

        const trade = await prisma.trades.findFirst({
            where: {
                id: id
            }
        })

        if (!trade) {
            throw new TradeValidation('Trade no encontrado')
        }

        try {
            await prisma.trades.delete({
                where: {
                    id: id
                }
            })
            return trade
        } catch (error) {
            throw new DbError(error)
        }
    }

}
