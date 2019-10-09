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
    }
}

const rentRoutes=new RentRoutes();
export default rentRoutes.router;