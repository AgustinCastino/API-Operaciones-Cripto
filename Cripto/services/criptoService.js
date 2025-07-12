import {newCrypto as newCrytoModel, updateCrypto as updateCryptoModel} from '../models/cryptoModel.js'
import { validarCripto, validarCriptoParcial } from "../schema/cripto.js"

export class criptoService {

    static async newCrypto(crypto) {  
        crypto.shortname =  crypto.shortname.toUpperCase()

        const validatedCrypto = validarCripto(crypto)
        if (!validatedCrypto.success) {
            return {success:false, error:JSON.parse(validatedCrypto.error.message)}
        }

        await newCrytoModel(crypto)

        return {success:true, data:crypto}
    }

    static updateCrypto( id, data ) {
        const indice = criptos.findIndex((operacion) => operacion.id == id);

        criptos[indice] = {
            ...criptos[indice],
            ...data
        }

        return criptos[indice]        
    }
}