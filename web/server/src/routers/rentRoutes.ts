import {Router} from 'express';
import rentController from "../controllers/rentController";

class RentRoutes{
    //ATTRIBUTE
    public router:Router= Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/search',rentController.search);
        this.router.post('/filter',rentController.filter);
        this.router.get('/reserve/:matricula',rentController.reserveVehicle);
        this.router.post('/finalizar',rentController.finishied);
    }
}

const rentRoutes=new RentRoutes();
export default rentRoutes.router;