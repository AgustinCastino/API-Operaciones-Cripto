const pool = require('../mysql')

const newCrypto = async (crypto) =>{

    const {name, shortname, price, lastUpdate} = crypto
    const sql = `
        INSERT INTO cryptos (name, shortname, price, lastUpdate)
        VALUES (?, ?, ?, ?)
    `;

    await model.query(sql, [name, shortname, price, lastUpdate]);
}

const updateCrypto = async (cripto) => {
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
