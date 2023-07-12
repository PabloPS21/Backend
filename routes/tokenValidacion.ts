import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const tokenValidacion = (req: Request, res: Response, next: NextFunction) => {

    //Guardamos el token
    const headerToken = req.headers['authorization'];

    
    //Verificamos si es el usuario root
    const {username} = req.body;

    //Si lo es, le dejamos pasar y terminamos la ejecución, si no pasamos al siguiente if
    if(username == "root") {
        return next();
    }

    //Comprobamos primero si tiene token 
    if(headerToken != undefined && headerToken.startsWith('Bearer ')) {

        try {
            //Nos quedamos con el token sin la cadena 'Bearer'
            const token = headerToken.slice(7);
            
            //Verificamos el token con la clave secreta establecida en el fichero env
            const verifiedToken: any = jwt.verify(token, process.env.JWT_KEY || 'supersecretkey');


            // Comprobamos si el ID en la URL coincide con el ID del usuario autenticado
            if (req.params.id != verifiedToken.id) {
                return res.status(403).json({ message: 'Acceso denegado' });
             }

            next();

        } catch (error) {

            res.status(401).json({ message: 'No autorizado' });

        }
     
    //Si no tiene token no dejamos pasar
    } else {
        res.status(401).json({ message: 'No tienes autorización' });
    }
}

export default tokenValidacion;