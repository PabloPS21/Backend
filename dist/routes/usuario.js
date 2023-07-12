"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../controllers/usuario");
const tokenValidacion_1 = __importDefault(require("./tokenValidacion"));
const userRouter = (0, express_1.Router)();
//Rutas
userRouter.get("/", usuario_1.getUsuarios);
userRouter.get("/:id", usuario_1.getUsuario);
userRouter.post("/", usuario_1.registrarUsuario);
userRouter.post("/login", usuario_1.loginUsuario);
userRouter.delete("/:id", usuario_1.deleteUsuario);
userRouter.get("/:id/games", tokenValidacion_1.default, usuario_1.getUserGames); // Para poder ejecutar getUserGames tendrá primero que verificar el token
exports.default = userRouter;
//# sourceMappingURL=usuario.js.map