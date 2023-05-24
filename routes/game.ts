import { Router } from "express";
import { getGames, getGame, registrarJuego, eliminarJuego, modificarJuego} from "../controllers/game";

const gameRouter = Router();

//Rutas
gameRouter.get("/", getGames);
gameRouter.get("/:id", getGame);
gameRouter.post("/", registrarJuego);
gameRouter.delete("/:id", eliminarJuego);
gameRouter.put("/:id", modificarJuego);

export default gameRouter;