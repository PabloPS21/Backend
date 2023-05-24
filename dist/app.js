"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./models/server"));
const dotenv_1 = __importDefault(require("dotenv"));
//Utilizar variables de entorno
dotenv_1.default.config();
//Creamos instancio de server
const server = new server_1.default();
server.listen();
//# sourceMappingURL=app.js.map