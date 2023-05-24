"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const usuario_1 = __importDefault(require("./usuario"));
const Game = connection_1.default.define('Game', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fechaInicio: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    fechaFin: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM('Pendiente', 'Jugando', 'Finalizado'),
        allowNull: false,
    },
    //TODO: Añadir URL imagen
});
Game.belongsTo(usuario_1.default, { foreignKey: 'id_usuario' });
exports.default = Game;
//# sourceMappingURL=games.js.map