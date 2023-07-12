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
exports.modificarJuego = exports.eliminarJuego = exports.registrarJuego = exports.getGame = exports.getGames = void 0;
const games_1 = __importDefault(require("../models/games"));
//Obtener juegos
const getGames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield games_1.default.findAll();
    res.json(games);
});
exports.getGames = getGames;
//Obtener un juego por ID
const getGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const game = yield games_1.default.findByPk(id);
    if (game) {
        res.json(game);
    }
    else {
        res.status(404).json({ message: "Juego no encontrado" });
    }
});
exports.getGame = getGame;
//Registrar juego
const registrarJuego = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_usuario, nombre, estado, urlImage } = req.body;
        var fechaInicio = null;
        var fechaFin = null;
        // Verificar si el juego ya está registrado para el usuario
        const juegoExistente = yield games_1.default.findOne({
            where: {
                id_usuario: id_usuario,
                nombre: nombre
            }
        });
        if (juegoExistente) {
            return res.status(400).json({ error: 'El juego ya ha sido registrado anteriormente.' });
        }
        //Cambia las fechas según el estado registrado
        switch (estado) {
            case 'Jugando':
                fechaInicio = Date.now();
                break;
            case 'Finalizado':
                fechaInicio = Date.now();
                fechaFin = Date.now();
                break;
            case 'Pendiente':
                fechaInicio = null;
                fechaFin = null;
                break;
        }
        // Crear el nuevo juego si no existe duplicado
        const nuevoJuego = yield games_1.default.create({
            id_usuario: id_usuario,
            nombre: nombre,
            estado: estado,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            urlImage: urlImage
        });
        return res.status(201).json(nuevoJuego);
    }
    catch (error) {
        console.error('Error al registrar el juego:', error);
        return res.status(500).json({ error: 'Ha ocurrido un error al registrar el juego.' });
    }
});
exports.registrarJuego = registrarJuego;
// Eliminar juego
const eliminarJuego = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const juego = yield games_1.default.findByPk(id);
        if (!juego) {
            return res.status(404).json({ error: 'Juego no encontrado.' });
        }
        // Eliminar el juego
        yield juego.destroy();
        return res.json({ message: 'Juego eliminado correctamente.' });
    }
    catch (error) {
        console.error('Error al eliminar el juego:', error);
        return res.status(500).json({ error: 'Ha ocurrido un error al eliminar el juego.' });
    }
});
exports.eliminarJuego = eliminarJuego;
// Modificar el estado, la fecha de inicio y la fecha de final
const modificarJuego = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const game = yield games_1.default.findByPk(id);
    if (!game) {
        return res.status(404).json({ error: 'Juego no encontrado.' });
    }
    const { fechaInicio, fechaFin, estado } = req.body;
    //Modificamos los valores
    game.fechaInicio = fechaInicio;
    game.fechaFin = fechaFin;
    game.estado = estado;
    //Guardamos
    yield game.save();
    return res.json({ message: 'Juego actualizado correctamente.' });
});
exports.modificarJuego = modificarJuego;
//# sourceMappingURL=game.js.map