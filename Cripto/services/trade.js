import fs from 'node:fs'
import path from 'node:path'

const JSONpath = path.resolve('../Cripto', 'trades.json');
let trades;

fs.readFile(JSONpath, 'utf8', async (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }
    try {   
        trades = await JSON.parse(data);
    } catch (err) {
        console.error('Error al parsear el JSON:', err);
    }
});

export class tradeModel {

    static getAll() {
        return trades;
    }
    
    static getFilteredCripto( cripto ){
        const filteredCripto = trades.filter((operacion) => operacion.cripto == cripto);
        const promedioCompra = this.getPromedio(filteredCripto);

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
        const compras = trades.filter((operacion) => operacion.tipo_operacion == 'compra');
        return compras;
    }

    static getVentas() {
        const compras = trades.filter((operacion) => operacion.tipo_operacion == 'venta');
        return compras;
    }

    static newTrade( operacion ) {
        trades.push(operacion)
        
        const data = JSON.stringify(trades)

        console.log(data);
        

        fs.writeFile(JSONpath, data, err => {
            if (err) {
              console.error(err);
            } 
        });

        return operacion   
    }

    static updateTrade( id, data ) {
        const indice = trades.findIndex((operacion) => operacion.id == id);

        trades[indice] = {
            ...trades[indice],
            ...data
        }

        return trades[indice]        
    }
}