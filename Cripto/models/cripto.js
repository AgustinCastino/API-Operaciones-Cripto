import fs from 'node:fs'
import path from 'node:path'

const JSONpath = path.resolve('../Cripto', 'cripto.json');
let criptos;

fs.readFile(JSONpath, 'utf8', async (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }
    try {
        
        criptos = await JSON.parse(data);
        
    } catch (err) {
        console.error('Error al parsear el JSON:', err);
    }
});

export class criptoModel {

    static getAll() {
        return criptos;
    }

    static getCompras() {
        const compras = criptos.filter((operacion) => operacion.tipo_operacion == 'compra');
        return compras;
    }

    static getVentas() {
        const compras = criptos.filter((operacion) => operacion.tipo_operacion == 'venta');
        return compras;
    }

    static crearOperacion( operacion ) {
        console.log(operacion);

        criptos.push(operacion)

        return operacion
        
    }

    static actualizarOperacion( id, data ) {
        const indice = criptos.findIndex((operacion) => operacion.id == id);

        criptos[indice] = {
            ...criptos[indice],
            ...data
        }

        return criptos[indice]
        
    }


  
}