import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Usuario from "../models/usuario";
import Game from "../models/games";


//Métodos soportados para los usuarios

//Obtener todos los usuarios
export const getUsuarios = async(req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    res.json(usuarios);
}

//Obtener un usuario por ID
export const getUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;

    const usuario =  await Usuario.findByPk(id);

    if(usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }

}

//Registrar usuario
export const registrarUsuario =  async (req: Request, res: Response) => {

    const {username, email, contraseña} = req.body;

    const existsUsername = await Usuario.findOne({where:{username: username}})
    const existsEmail = await Usuario.findOne({where:{email: email}})

    if(existsUsername) {
            return res.status(400).json({ message: "El usuario ya existe" });
    }

    if(existsEmail) {
        return res.status(400).json({ message: "Ya existe un usario con ese correo" });
    }

    //Encriptar contraseña
    const hashContraseña = await bcrypt.hash(contraseña, 10)

    try {
        await Usuario.create({
            username: username,
            email: email,
            contraseña: hashContraseña
        })
    
        res.json({
            msg: 'Usuario registado con exito' 
        });

    } catch(error){
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
         });
    }

}


//Loggear usuario
export const loginUsuario =  async (req: Request, res: Response) => {
    const { username, email, contraseña } = req.body;

    //Validar credenciales
    const existeUsuario: any = await Usuario.findOne({where:{username: username}});
    const existeEmailUsuario = await Usuario.findOne({where:{email: email}});

    if(!existeUsuario) {
        return res.status(400).json({ msg: "Usuario no encontrado" });
    }
    if(!existeEmailUsuario) {
        return res.status(400).json({ msg: "Correo incorrecto" });
    }


    //Comprobar contraseña hasheada con la que manda el usuario
    const contraseñaValida = await bcrypt.compare(contraseña, existeUsuario.contraseña)

    if(!contraseñaValida) {
        return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    // Obtener el ID del usuario
    const id = existeUsuario.id;

    //Una vez el usuario se ha validado, generamos el token jwt
    const token = jwt.sign({
        username: username,
        id: id,
    }, process.env.JWT_KEY || 'supersecretkey',);

    res.json({existeUsuario, token});
}


//Elimina usuario
export const deleteUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuarioEliminado = await Usuario.destroy({where:{id: id}});

    if(!usuarioEliminado) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
        msg: 'Usuario eliminado con éxito'
    });
}


//Obtiene los juegos de un usuario
export const getUserGames = async (req: Request, res: Response) => {

    //TODO: Caso que no exista ningun usuario con esa id

    const { id } = req.params;

    const usuario =  await Usuario.findByPk(id);

    if(!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

    const game = await Game.findOne({where:{id_usuario: id}});

    res.json(game);
}