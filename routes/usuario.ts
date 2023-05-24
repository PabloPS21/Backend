import { Router } from "express";
import { deleteUsuario, getUserGames, getUsuario, getUsuarios, loginUsuario, registrarUsuario } from "../controllers/usuario";
import tokenValidacion from "./tokenValidacion";

const userRouter = Router();

//Rutas
userRouter.get("/", getUsuarios);
userRouter.get("/:id", getUsuario);
userRouter.post("/", registrarUsuario);
userRouter.post("/login", loginUsuario);
userRouter.delete("/:id", deleteUsuario);

userRouter.get("/:id/games", tokenValidacion, getUserGames);


export default userRouter;