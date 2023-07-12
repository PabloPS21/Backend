"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserGames = exports.deleteUsuario = exports.loginUsuario = exports.registrarUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../models/usuario"));
const games_1 = __importDefault(require("../models/games"));
//Métodos soportados para los usuarios
//Obtener todos los usuarios
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json(usuarios);
});
exports.getUsuarios = getUsuarios;
//Obtener un usuario por ID
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
});
exports.getUsuario = getUsuario;
//Registrar usuario
const registrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, contraseña } = req.body;
    const existsUsername = yield usuario_1.default.findOne({ where: { username: username } });
    const existsEmail = yield usuario_1.default.findOne({ where: { email: email } });
    if (existsUsername) {
        return res.status(400).json({ message: "El usuario ya existe" });
    }
    if (existsEmail) {
        return res.status(400).json({ message: "Ya existe un usario con ese correo" });
    }
    //Encriptar contraseña
    const hashContraseña = yield bcrypt_1.default.hash(contraseña, 10);
    try {
        yield usuario_1.default.create({
            username: username,
            email: email,
            contraseña: hashContraseña
        });
        res.json({
            msg: 'Usuario registado con exito'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.registrarUsuario = registrarUsuario;
//Loggear usuario
const loginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, contraseña } = req.body;
    //Validar credenciales
    const usuario = yield usuario_1.default.findOne({ where: { username: username } });
    if (!usuario) {
        return res.status(400).json({ msg: "User not found" });
    }
    //Comprobar contraseña hasheada con la que manda el usuario
    const contraseñaValida = yield bcrypt_1.default.compare(contraseña, usuario.contraseña);
    if (!contraseñaValida) {
        return res.status(400).json({ msg: "Incorrect password" });
    }
    // Obtener el ID del usuario
    const id = usuario.id;
    //Una vez el usuario se ha validado, generamos el token jwt
    const token = jsonwebtoken_1.default.sign({
        username: username,
        id: id,
    }, process.env.JWT_KEY || 'supersecretkey');
    res.json({ usuario, token });
});
exports.loginUsuario = loginUsuario;
//Elimina usuario
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuarioEliminado = yield usuario_1.default.destroy({ where: { id: id } });
    if (!usuarioEliminado) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({
        msg: 'Usuario eliminado con éxito'
    });
});
exports.deleteUsuario = deleteUsuario;
//Obtiene los juegos de un usuario
const getUserGames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO: Caso que no exista ningun usuario con esa id
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const games = yield games_1.default.findAll({ where: { id_usuario: id } });
    res.json(games);
});
exports.getUserGames = getUserGames;
//# sourceMappingURL=usuario.js.map