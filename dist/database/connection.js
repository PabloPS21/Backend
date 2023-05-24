"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const baseDatos = 'prueba';
const username = 'root';
const password = '21092000a';
const db = new sequelize_1.Sequelize(baseDatos, username, password, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false //---> no ver los comandos sql en la consola
});
exports.default = db;
//# sourceMappingURL=connection.js.map