
import {Request, Response} from "express";
import pool from "../database";

class IndexController{

    public index(req:Request, res:Response){
        pool.query('DESCRIBE games');
        res.json('games');
    }

}


const indexController= new IndexController();
export default indexController;