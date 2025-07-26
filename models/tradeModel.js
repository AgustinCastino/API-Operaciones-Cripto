import { pool } from '../mysql.js'

export class tradeModel {

    static async getAllTrades() {
        const sql = `SELECT * FROM trades`
        try {
            const result = await pool.query(sql);
            return result
        } catch (error) {
            console.error('Error al obtener trades:', error.message);
            console.error(error);
        }

    }

    static async getTradeById(id) {
        const sql = `SELECT * FROM trades WHERE id = ?`
        try {
            const result = await pool.query(sql, id);
            return result
        } catch (error) {
            console.error('Error al obtener trade:', error.message);
            console.error(error);
        }

    }

    static async newTrade(trade) {
        const { user_id, crypto_id, trade_type, crypto_amount, usdt_amount, unit_price } = trade
        console.log(trade);
        
        try {
            const sql = `
                INSERT INTO trades (user_id, crypto_id, trade_type, crypto_amount, usdt_amount, unit_price)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            await pool.query(sql, [user_id, crypto_id, trade_type, crypto_amount, usdt_amount, unit_price]);
        } catch (error) {
            console.error('Error al insertar trade:', error.message);
            console.error(error);
        }

    }

    static async updateTrade(id, fields) {
        const keys = Object.keys(fields);
        if (keys.length === 0) return;

        const setClause = keys.map(key => `${key} = ?`).join(', ');
        const values = keys.map(key => fields[key]);

        const sql = `
            UPDATE trades
            SET ${setClause}
            WHERE id = ?
        `;

        values.push(id);

        try {
            await pool.query(sql, values);
        } catch (error) {
            console.log(error);
        }

    }

    static async deleteTrade(id) {
        const sql = `DELETE FROM trades WHERE id = ?`

        try {
            const result = await pool.query(sql, id);
            return result
        } catch (error) {
            console.error('Error al eliminar trade:', error.message);
            console.error(error);
        }

    }

}