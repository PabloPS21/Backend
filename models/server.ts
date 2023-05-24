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
        this.port = process.env.PORT || '8000';

        this.databaseConnection();

        this.transformaciones();

        this.routes();
        
    }

    async databaseConnection(){

        try{

            //Conexión con los modelos a la base de datos
            await Usuario.sync();
            await Game.sync();
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
        
        //Acceder al body
        this.app.use(cors());

        //Parsear el body
        this.app.use(express.json());
    }


    //Método listen
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor ejecutándose en puerto ${this.port}`);
        })
    }
}

export default Server;