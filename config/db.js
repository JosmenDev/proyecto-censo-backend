// Importar dependencias
import sequelize from 'sequelize'
import dotenv from 'dotenv'

// Comando para hacer uso de las variables de entorno
dotenv.config();

const db = new sequelize('hl_censo', 'root','', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
})

const conectarDB = async() => {
    try {
        await db.authenticate();
        console.log(`Conectado a la DB`);
    } catch (error) {
        console.log(`Error: ${error}`);
        // Permite imprimir mensaje de error
        process.exit(1);
    }
}

conectarDB();

export default db;