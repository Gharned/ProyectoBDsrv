"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Modulos utiles
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan")); //nos mostrara las peticiones al servidor
const cors_1 = __importDefault(require("cors")); //buscar lo que hace
//Routes
const indexRoutes_1 = __importDefault(require("./routers/indexRoutes"));
const rentRoutes_1 = __importDefault(require("./routers/rentRoutes"));
const sinisterRoutes_1 = __importDefault(require("./routers/sinisterRoutes"));
class Server {
    //de tipo Application del modul de express
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    //METODOS--
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev')); //peticion a consola
        this.app.use(cors_1.default()); //Angular puede empezar a pedir datos al servidor
        //tambien permite la comunicacion entre servidor (angular y mi servidor), con la rest api
        this.app.use(express_1.default.json()); //nos permite que el servidor pueda tomar formatos json y
        //ademas pasa los datos de post u otros a json para ser obtenidos con req.body
        this.app.use(express_1.default.urlencoded({ extended: false })); //to formulary
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/rent', rentRoutes_1.default); //enrutador de la renta
        this.app.use('/api/sinister', sinisterRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on Port ', this.app.get('port')); //teminal mensaje
        });
    }
}
const server = new Server();
server.start();
