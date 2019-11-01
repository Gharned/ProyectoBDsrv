
import {Router} from 'express';

import sinisterController from "../controllers/sinisterController";

class SinisterRoutes{
    //ATTRIBUTE
    public router:Router= Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',sinisterController.showSinister); //visualizara la pagina siniestro
        this.router.post('/send',sinisterController.sentSiniestro);
    }
}

const sinisterRoutes=new SinisterRoutes();
export default sinisterRoutes.router;