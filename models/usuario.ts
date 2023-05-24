import {DataTypes}  from 'sequelize';
import db from '../database/connection';

const Usuario = db.define('Usuario', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true,  
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    }

});


export default Usuario;