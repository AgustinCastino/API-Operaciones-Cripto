import { PrismaClient } from '@prisma/client'
import { CryptoValidation } from '../Errors/cryptoErrors.js'
import { validarCripto, validarCriptoParcial } from "../schema/cripto.js"
import { DbError } from '../Errors/dbErrors.js'

const prisma = new PrismaClient()

export class criptoService {

    static async getAllCryptos() {
        return await prisma.cryptos.findMany()
    }

    static async newCrypto(crypto) {
        crypto.shortname = crypto.shortname.toUpperCase()

        const validatedCrypto = validarCripto(crypto)
        if (!validatedCrypto.success) {
            throw new CryptoValidation(validatedCrypto.error.message)
        }

        try {
            await prisma.cryptos.create({
                data:{
                    name: crypto.name,
                    short_name: crypto.shortname,
                    price: crypto.price
                }
            })

            return { success: true, data: crypto };
        } catch (error) {            
            throw new DbError(error)
        }
    }

    static async updateCrypto(id, data) {
        const validatedCryptoUpdate = validarCriptoParcial(data)
        if (!validatedCryptoUpdate.success) {
            throw new CryptoValidation(validatedCryptoUpdate.error.message)
        }

        id = Number(id)

        try {
            await prisma.cryptos.update({
                where:{
                    id: id
                },
                data:data
            })
            return data ;
        } catch (error) {
            throw new DbError(error)
        }
    }

    static async deleteCrypto(id) {
        id = Number(id)
        const crypto = await prisma.cryptos.findFirst({
            where: {
                id: id
            }
        })

        if (!crypto) {
            throw new CryptoValidation('Crypto no encontrada')
        }

        try {
            await prisma.cryptos.delete({
                where: {
                    id: id
                }
            })

            return crypto
        } catch (error) {
            throw new DbError(error)
        }
    }
}