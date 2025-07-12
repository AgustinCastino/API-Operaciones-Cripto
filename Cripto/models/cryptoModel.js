import {pool} from '../mysql.js'

export const newCrypto = async (crypto) =>{

  console.log('Entra a la query');

  try{
    const {name, shortname, price, lastUpdate} = crypto
    const sql = `
      INSERT INTO cryptos (name, short_name, price)
      VALUES (?, ?, ?)
    `;
  
    await pool.query(sql, [name, shortname, price]);
  } catch(error){
    console.error('Error al insertar crypto:', error.message);
    console.error(error); // Mostramos todo el error
  }
  

}

export const updateCrypto = async (cripto) => {
  const { id, ...fields } = cripto;

  if (!id) throw new Error('Se requiere un id para actualizar');

  const keys = Object.keys(fields); 
  if (keys.length === 0) return; 


  const setClause = keys.map(key => `${key} = ?`).join(', ');
  const values = keys.map(key => fields[key]);

  const sql = `
    UPDATE cryptos
    SET ${setClause}, lastUpdate = ?
    WHERE id = ?
  `;

  values.push(new Date()); 
  values.push(id);         

  await pool.query(sql, values);
};
