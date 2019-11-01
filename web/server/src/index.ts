//Modulos utiles
import express, {Application} from 'express';
import morgan from 'morgan'; //nos mostrara las peticiones al servidor
import cors from 'cors'; //buscar lo que hace

//Routes
import indexRoutes from './routers/indexRoutes';
import rentRoutes from './routers/rentRoutes';
import sinisterRoutes from './routers/sinisterRoutes';



class Server{
    //ATTRIBUTE
    public app:Application; //declaro una variable publica
    //de tipo Application del modul de express
    
    constructor(){
        this.app=express();
        this.config();
        this.routes();
    }

    //METODOS--
    config():void{ //son configuraciones de express
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev')); //peticion a consola
        this.app.use(cors()); //Angular puede empezar a pedir datos al servidor
        //tambien permite la comunicacion entre servidor (angular y mi servidor), con la rest api

        this.app.use(express.json()); //nos permite que el servidor pueda tomar formatos json y
        //ademas pasa los datos de post u otros a json para ser obtenidos con req.body

        this.app.use(express.urlencoded({extended:false})); //to formulary

    }

    routes():void{
        this.app.use('/',indexRoutes);
        this.app.use('/api/rent',rentRoutes); //enrutador de la renta
        this.app.use('/api/sinister',sinisterRoutes);
    }

    start():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('Server on Port ',this.app.get('port')); //teminal mensaje
        });
    }

}

const server = new Server();
server.start();
