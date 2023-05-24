"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const game_1 = require("../controllers/game");
const gameRouter = (0, express_1.Router)();
//Rutas
gameRouter.get("/", game_1.getGames);
gameRouter.get("/:id", game_1.getGame);
gameRouter.post("/", game_1.registrarJuego);
gameRouter.delete("/:id", game_1.eliminarJuego);
gameRouter.put("/:id", game_1.modificarJuego);
exports.default = gameRouter;
//# sourceMappingURL=game.js.map