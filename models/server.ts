import express, {Application} from 'express';
import cors from 'cors';


import routerUsuarios from '../routes/usuario';
import routerGames from '../routes/game';
import Usuario from './usuario';
import Game from './games';

class Server {
    
    private app: Application;
    private port: string;

    //Definimos las rutas
    private apiEndpoints = {
        usuarios: '/api/usuarios',
        games: '/api/games'
    }

    constructor() {
        this.app = express();
        this.port = '8000';

        this.databaseConnection();

        this.transformaciones();

        this.routes();
               
    }

    //Conexión a la base de datos
    async databaseConnection(){

        try{

            //Conexión con los modelos a la base de datos
            await Usuario.sync();
            await Game.sync({ alter: true });       //"alter: force" para hacer que la base de datos se borre y se vuelva a crear       
            console.log("Conectado a la base de datos");

        } catch (error) {
            throw error;
        }
    }

    //Método encargado de utilizar las rutas establecidas
    routes(){
        this.app.use(this.apiEndpoints.usuarios, routerUsuarios);
        this.app.use(this.apiEndpoints.games, routerGames);
    }

    //Método que se ejecuta antes de que se usen las rutas
    transformaciones(){
        
        // Parsear el body
        this.app.use(express.json());

        // Acceder al body y habilitar CORS
        this.app.use(cors({
        origin: 'http://localhost:4200',
        credentials: true
        }));
    }


    //Método listen
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor ejecutándose en puerto ${this.port}`);
        })
    }
}

export default Server;