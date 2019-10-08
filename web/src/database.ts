import mysql from "promise-mysql";
import keys from "./keys";

const pool = mysql.createPool(keys.database); //ejecutaremos el modulo de la conexion de la base de datos

pool.getConnection()
    .then(connection =>{ //en caso de que sse conecte
        pool.releaseConnection(connection);
        console.log('DB is connected');
    });

export default pool;