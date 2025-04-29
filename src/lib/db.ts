import { Pool } from 'pg';

const isProduction = process.env.NODE_ENV === 'production';
const pool = new Pool(
   isProduction && process.env.DATABASE_URL
   ? { 
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }

   } : {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
})

pool.connect()
.then(() => console.log("✅ Conectado ao banco de dados"))
.catch((err) => {
    console.error("❌ Erro na conexão com o banco:", err.stack);
    process.exit(1)
})
export default pool;