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

    static newCripto( cripto ) {
        criptos.push(cripto)
        
        const data = JSON.stringify(criptos)

        console.log(data);
        

        fs.writeFile(JSONpath, data, err => {
            if (err) {
              console.error(err);
            } 
        });

        return cripto   
    }

    static updateCripto( id, data ) {
        const indice = criptos.findIndex((operacion) => operacion.id == id);

        criptos[indice] = {
            ...criptos[indice],
            ...data
        }

        return criptos[indice]        
    }
}