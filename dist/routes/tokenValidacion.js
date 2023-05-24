"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenValidacion = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    console.log(headerToken);
    //Comprobamos primero si tiene token 
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            //Nos quedamos con el token sin la cadena 'Bearer'
            const token = headerToken.slice(7);
            //Verificamos el token con la clave secreta establecida en el fichero env
            const verifiedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY || 'supersecretkey');
            // Comprobamos si el ID en la URL coincide con el ID del usuario autenticado
            if (req.params.id != verifiedToken.id) {
                return res.status(403).json({ message: 'Acceso denegado' });
            }
            next();
        }
        catch (error) {
            res.status(401).json({ message: 'No autorizado' });
        }
        //Si no tiene token no dejamos pasar
    }
    else {
        res.status(401).json({ message: 'No tienes autorización' });
    }
};
exports.default = tokenValidacion;
//# sourceMappingURL=tokenValidacion.js.map