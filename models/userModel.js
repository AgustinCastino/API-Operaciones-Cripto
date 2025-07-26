import { pool } from '../mysql.js'

export class userModel {

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

  static async getUserByEmail(email){
    const sql = `SELECT * FROM users WHERE email = ?`
    try{
      const result = await pool.query(sql, email);
      return result
    } catch(error){
      console.error('Error al obtener user:', error.message);
      return false
    }
  }

  static async getUserByUsername(username){
    const sql = `SELECT * FROM users WHERE user_name = ?`
    try{
      const result = await pool.query(sql, username);
      return result
    } catch(error){
      console.error('Error al obtener user:', error.message);
      return false
    }
  }

  static async newUser(newUser) {
    try {
      const { name, surname, username, email, password } = newUser
      const sql = `
        INSERT INTO users (name, surname, user_name, email, password)
        VALUES (?, ?, ?, ?, ?)
      `;
  
      await pool.query(sql, [name, surname, username, email, password ]);
    } catch (error) {
      console.error('Error al insertar User:', error.message);
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

  static async deleteCrypto(id){
    const sql = `DELETE FROM cryptos WHERE id = ?`

    try{
      const result = await pool.query(sql, id);
      return result
    } catch(error){
      console.error('Error al obtener cryptos:', error.message);
      console.error(error);
    }

  }
}



