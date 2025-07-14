import { pool } from '../mysql.js'

export class cryptoModel {

  static async getAllCryptos() {
    try {
      const sql = `SELECT * FROM cryptos`
      const result = await pool.query(sql);

      return result
    } catch (error) {
      console.error('Error al obtener cryptos:', error.message);
      console.error(error);
    }

  }

  static async getCryptoById(id){
    try{
      const sql = `SELECT * FROM cryptos WHERE id = ?`

      const result = await pool.query(sql, id);
      return result
    } catch(error){
      console.error('Error al obtener cryptos:', error.message);
      console.error(error);
    }

  }

  static async newCrypto(crypto) {
    try {
      const { name, shortname, price, lastUpdate } = crypto
      const sql = `
        INSERT INTO cryptos (name, short_name, price)
        VALUES (?, ?, ?)
      `;
  
      await pool.query(sql, [name, shortname, price]);
    } catch (error) {
      console.error('Error al insertar crypto:', error.message);
      console.error(error);
    }
  }

  static async updateCrypto (id, fields){
    const keys = Object.keys(fields); 
    if (keys.length === 0) return;

    const setClause = keys.map(key => `${key} = ?`).join(', ');
    const values = keys.map(key => fields[key]);
  
    const sql = `
      UPDATE cryptos
      SET ${setClause}
      WHERE id = ?
    `;

    values.push(id);

    try{
      await pool.query(sql, values);
    }catch(error){
      console.log(error);
    }
  
  };
}



