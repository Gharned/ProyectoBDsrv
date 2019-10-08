import {Router} from 'express';

class RentRoutes{
    //ATTRIBUTE
    public router:Router= Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',(req,res)=>res.send('RENTS'));
    }
}

const rentRoutes=new RentRoutes();
export default rentRoutes.router;