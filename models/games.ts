import {DataTypes}  from 'sequelize';
import db from '../database/connection';
import Usuario from './usuario';

const Game = db.define('Game', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fechaInicio: {
        type: DataTypes.DATE,
        allowNull: true
      },
      fechaFin: {
        type: DataTypes.DATE,
        allowNull: true
      },
      estado: {
        type: DataTypes.ENUM('Pendiente', 'Jugando', 'Finalizado'),
        allowNull: false,
      },

      //TODO: Añadir URL imagen
})

Game.belongsTo(Usuario, {foreignKey: 'id_usuario'});


export default Game;