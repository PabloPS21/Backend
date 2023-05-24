import Server from './models/server';
import dotenv from 'dotenv';

//Utilizar variables de entorno
dotenv.config();

//Creamos instancio de server
const server = new Server();

server.listen();
