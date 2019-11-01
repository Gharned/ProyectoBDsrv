
import {Request, Response} from "express";
import pool from "../database";

class IndexController{

    public async list(req:Request, res:Response):Promise<void>{ //estoy ejecutando promesa, pero no devuelve nada
        const sucursales= await pool.query('select id_sucursal,region,ciudad,calle,numero from Direccion_sucursal;'); //termina cuando pueda
        res.send(sucursales);
    }
}


const indexController= new IndexController();
export default indexController;