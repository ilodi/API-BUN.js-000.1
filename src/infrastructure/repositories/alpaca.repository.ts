import mysql from 'mysql2';
import config from '../../config';
import Alpaca from '../../domain/Alpaca/Alpaca';

const pool = mysql.createPool({
    host: config.DATABASE.HOST,
    user: config.DATABASE.USER,
    password: config.DATABASE.PASSWORD,
    database: config.DATABASE.DATABASE
}).promise();

type DbAlpaca = {
    id: number,
    name: string,
    color: string
}

export const get = async (alpacaId: number): Promise<Alpaca | null> => {
    const [rows] = await pool.query('SELECT * FROM alpaca WHERE id = ?', [alpacaId]);
    const dbAlpacas = rows as DbAlpaca[];
    return dbAlpacas.length > 0 ? restore(dbAlpacas[0]) : null;
};

export const getAll = async(): Promise<Alpaca []> =>{
    const [rows] = await pool.query('SELECT * FROM alpaca', []); 
    const dbAlpacas = rows as DbAlpaca[];
    return dbAlpacas.map(restore)
}

export const deleteAlpacaById = async (alpacaId: number): Promise<void> => {
    try {
        await pool.query('DELETE FROM alpaca WHERE id = ?', [alpacaId]);
    } catch (error) {
        console.error('Error deleting alpaca by ID:', error);
        throw new Error('Database query failed');
    }
};

const restore = (dbAlpaca: DbAlpaca): Alpaca => {
    return new Alpaca({
        id: dbAlpaca.id,
        name: dbAlpaca.name,
        color: dbAlpaca.color
    })
}
