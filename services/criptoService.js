import { PrismaClient } from '@prisma/client'
import { validarCripto, validarCriptoParcial } from "../schema/cripto.js"

const prisma = new PrismaClient()

export class criptoService {

    static async getAllCryptos() {
        try {
            const cryptos = await prisma.cryptos.findMany()
            return { success: true, data: cryptos };
        } catch (error) {
            return { success: false, error };
        }
    }

    static async newCrypto(crypto) {
        crypto.shortname = crypto.shortname.toUpperCase()

        const validatedCrypto = validarCripto(crypto)
        if (!validatedCrypto.success) {
            return { success: false, error: JSON.parse(validatedCrypto.error.message) }
        }

        try {
            await prisma.cryptos.create({
                name: crypto.name,
                short_name: crypto.shortname,
                price: crypto.price
            })

            return { success: true, data: crypto };
        } catch (error) {
            return { success: false, error };
        }
    }

    static async updateCrypto(id, data) {
        const validatedCryptoUpdate = validarCriptoParcial(data)
        if (!validatedCryptoUpdate.success) {
            return { success: false, error: JSON.parse(validatedCryptoUpdate.error.message) }
        }

        try {
            await prisma.cryptos.update({
                where:{
                    id:id
                },
                data:data
            })
            return { success: true, data };
        } catch (error) {
            return { success: false, error };
        }
    }

    static async deleteCrypto(id) {
        const crypto = await prisma.cryptos.findFirst({
            where: {
                id: id
            }
        })

        if (!crypto) {
            return { success: false, error: 'Crypto not found' }
        }

        try {
            await prisma.cryptos.delete({
                where: {
                    id: id
                }
            })

            return { success: true, data: crypto };
        } catch (error) {
            return { success: false, error };
        }
    }
}