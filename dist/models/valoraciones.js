"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const games_1 = __importDefault(require("./games"));
const Valoracion = connection_1.default.define('Valoracion', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_game: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    comentario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    puntuacion: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 0,
            max: 10
        }
    }
});
Valoracion.belongsTo(games_1.default, { foreignKey: 'id_game' });
exports.default = Valoracion;
//# sourceMappingURL=valoraciones.js.map