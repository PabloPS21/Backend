import {Sequelize} from 'sequelize';

const baseDatos: string = 'prueba';
const username: string = 'root';
const password: string = '21092000a';

const db = new Sequelize(baseDatos, username, password, {
    host: 'localhost',
    dialect:'mysql',

    logging: false //---> no ver los comandos sql en la consola
});

export default db;