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
    static getFilteredCripto( cripto ){
        const filteredCripto = criptos.filter((operacion) => operacion.cripto == cripto);
        const promedioCompra = getPromedio(filteredCripto);

        const resp = {
            operaciones: filteredCripto,
            promedioCompra
        }

        return resp;
    }

    // Función para calcula promedio de compra de una cripto
    static getPromedio(filteredCripto){
        
        let cantidadCompras = 0;
        let acumuladorCompras = 0;
        let promedio = 0;

        filteredCripto.forEach(operacion => {
            
            if( operacion.tipo_operacion == 'compra'){                
                cantidadCompras++;
                acumuladorCompras += operacion.cantidad_usdt;
            }
        });
        
        if ( cantidadCompras > 0){
            promedio = acumuladorCompras / cantidadCompras;
        }

        return promedio || 0;
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
        criptos.push(operacion)
        
        const data = JSON.stringify(criptos)

        console.log(data);
        

        fs.writeFile(JSONpath, data, err => {
            if (err) {
              console.error(err);
            } 
        });

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