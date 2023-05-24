import { Request, Response } from "express";

import Game from "../models/games";

//Obtener juegos
export const getGames = async(req: Request, res: Response) => {

    const games = await Game.findAll();

    res.json(games);
}

//Obtener un juego por ID
export const getGame = async(req: Request, res: Response) => {

    const { id } = req.params;

    const game =  await Game.findByPk(id);

    if(game) {
        res.json(game);
    } else {
        res.status(404).json({ message: "Juego no encontrado" });
    }

}

//Registrar juego
export const registrarJuego =  async (req: Request, res: Response) => {
    
    try {
        const { id_usuario, nombre, estado} = req.body;

        var fechaInicio = null;
        var fechaFin = null;

    
        // Verificar si el juego ya está registrado para el usuario
        const juegoExistente = await Game.findOne({
          where: {
            id_usuario: id_usuario,
            nombre: nombre
          }
        });
    
        if (juegoExistente) {
          return res.status(400).json({ error: 'El juego ya ha sido registrado anteriormente.' });
        }


        //Cambia las fechas según el estado registrado
        switch(estado){
          case 'Jugando': fechaInicio = Date.now(); break;
          case 'Finalizado': fechaInicio = Date.now(); fechaFin = Date.now(); break;
        }
        
        // Crear el nuevo juego si no existe duplicado
        const nuevoJuego = await Game.create({
          id_usuario: id_usuario,
          nombre: nombre,
          estado: estado,
          fechaInicio: fechaInicio,
          fechaFin: fechaFin
        });
    
        return res.status(201).json(nuevoJuego);

      } catch (error) {
        console.error('Error al registrar el juego:', error);
        return res.status(500).json({ error: 'Ha ocurrido un error al registrar el juego.' });
      }
}

export const eliminarJuego = async (req: Request, res: Response) => {
    try {
      
      const { id } = req.params;
  
      const juego = await Game.findByPk(id);
  
      if (!juego) {
        return res.status(404).json({ error: 'Juego no encontrado.' });
      }
  
      // Eliminar el juego
      await juego.destroy();
  
      return res.json({ message: 'Juego eliminado correctamente.' });

    } catch (error) {
      console.error('Error al eliminar el juego:', error);
      return res.status(500).json({ error: 'Ha ocurrido un error al eliminar el juego.' });
    }
};

//TODO: modificar el juego (las fechas)
export const modificarJuego = async (req: Request, res: Response) => {

  const { id } = req.params;

  const game: any =  await Game.findByPk(id);
  
  if (!game) {
    return res.status(404).json({ error: 'Juego no encontrado.' });
  }

  const {fechaInicio, fechaFin } = req.body;

  //Modificamos los valores
  game.fechaInicio = fechaInicio;
  game.fechaFin = fechaFin;

  //Guardamos
  await game.save();

  return res.json({ message: 'Juego actualizado correctamente.' });
  
}
