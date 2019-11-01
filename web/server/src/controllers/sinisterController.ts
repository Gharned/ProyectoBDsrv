
import {Request, Response} from "express";
import pool from "../database";

class SinisterController{

    public showSinister(req:Request, res:Response){ //visualiza la pagina siniestro
        res.send("Estoy en la vista siniestro");
    }
    public async sentSiniestro(req:Request, res:Response){  //envia el formulario rellenado
        var formulario=req.body;
        await pool.query('insert into Siniestro (matricula,fecha_siniestro,descripcion,nombre_respon) values (?,?,?,?)',[formulario.matricula,formulario.fecha_siniestro,formulario.descripcion,formulario.nombre_respon]);
        res.send({message:'Exito'});
    }
}


const sinisterController= new SinisterController();
export default sinisterController;