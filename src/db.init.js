const { Pool } = require('pg');

// Подключение к базе данных
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
});

// Инициализация базы данных
const initDatabase = async () => {
    try {
        // Таблица (users) пользователей
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
            );
        `);

        console.log('Инициализация базы данных завершена.');
    } catch( error ) {
        console.error( 'Ошибка подключения к базе данных', error.message );
        process.exit( 1 );
    }
};

module.exports = { pool, initDatabase };