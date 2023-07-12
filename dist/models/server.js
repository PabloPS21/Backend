"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const game_1 = __importDefault(require("../routes/game"));
const usuario_2 = __importDefault(require("./usuario"));
const games_1 = __importDefault(require("./games"));
class Server {
    constructor() {
        //Definimos las rutas
        this.apiEndpoints = {
            usuarios: '/api/usuarios',
            games: '/api/games'
        };
        this.app = (0, express_1.default)();
        this.port = '8000';
        this.databaseConnection();
        this.transformaciones();
        this.routes();
    }
    //Conexión a la base de datos
    databaseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Conexión con los modelos a la base de datos
                yield usuario_2.default.sync();
                yield games_1.default.sync({ alter: true }); //"alter: force" para hacer que la base de datos se borre y se vuelva a crear       
                console.log("Conectado a la base de datos");
            }
            catch (error) {
                throw error;
            }
        });
    }
    //Método encargado de utilizar las rutas establecidas
    routes() {
        this.app.use(this.apiEndpoints.usuarios, usuario_1.default);
        this.app.use(this.apiEndpoints.games, game_1.default);
    }
    //Método que se ejecuta antes de que se usen las rutas
    transformaciones() {
        // Parsear el body
        this.app.use(express_1.default.json());
        // Acceder al body y habilitar CORS
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:4200',
            credentials: true
        }));
    }
    //Método listen
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor ejecutándose en puerto ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map