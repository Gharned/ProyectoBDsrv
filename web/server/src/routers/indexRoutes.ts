import {Router} from 'express';

import indexController from "../controllers/indexController";

class IndexRoutes{
    //ATTRIBUTE
    public router:Router= Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',indexController.list); //cuando se haga get a esta ruta, se ejecuta este metodo
    }
}

const indexRoutes=new IndexRoutes();
export default indexRoutes.router;