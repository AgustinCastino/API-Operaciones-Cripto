import { cryptoModel} from '../models/cryptoModel.js'
import { validarCripto, validarCriptoParcial } from "../schema/cripto.js"

export class criptoService {

    static async getAllCryptos(){
        try {
            const res = await cryptoModel.getAllCryptos();
            let cryptos = res[0];
            return { success: true, data: cryptos };
        } catch (error) {
            return {success: false, error };
        }
    }

    static async newCrypto(crypto) {  
        crypto.shortname =  crypto.shortname.toUpperCase()

        const validatedCrypto = validarCripto(crypto)
        if (!validatedCrypto.success) {
            return {success:false, error:JSON.parse(validatedCrypto.error.message)}
        }

        try {
            await cryptoModel.newCrypto(crypto)
            return { success: true, data: crypto };
        } catch (error) {
            return { success: false, error };
        }
    }

    static async updateCrypto( id, data ) {
        const validatedCryptoUpdate = validarCriptoParcial(data)
        if (!validatedCryptoUpdate.success) {
            return {success:false, error:JSON.parse(validatedCryptoUpdate.error.message)}
        }

        let crypto = await cryptoModel.getCryptoById(id)
        crypto = crypto[0]

        if(crypto.length == 0){
            return {success:false, error: 'Crypto not found'}
        }

        try {
            const res = await cryptoModel.updateCrypto(id, data)
            return { success: true, data };
        } catch (error) {
            return {success: false, error };
        }       
    }

    static async deleteCrypto(id){
        let crypto = await cryptoModel.getCryptoById(id)
        console.log(crypto);
        
        crypto = crypto[0]

        if(crypto.length == 0){
            return {success:false, error: 'Crypto not found'}
        }

        try {
            const res = await cryptoModel.deleteCrypto(id)
            return { success: true, data: crypto };
        } catch (error) {
            return {success: false, error };
        }  
    }
}