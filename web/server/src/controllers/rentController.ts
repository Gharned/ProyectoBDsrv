
import {Request, Response} from "express";
import pool from "../database";
import { queryCallback } from "mysql";

class RentController{

    public dataStore:any; //veremos como implementarlo


    public search(req:Request, res:Response){ //despues le pongo async
        var hello=req.body;
        //res.send(hello);
        this.dataStore= hello; //se obtiene, fecha_dev, fecha_ret, local_dev y local_dev
        //res.send(this.dataStore);
        
        //const vehiculos = await pool.query('select matricula,tipo,marca,modelo,color,anio,kilometraje,precio from Vehiculo where estado=0 and id_sucursal=?',,[this.dataStore.local_retiro]);
    }

    public filter(req:Request, res:Response){
        var filtros=req.body; //trae parametros de para el filtro
        console.log(filtros);
        var resultado=""; //guadara un string, con los filtros que seran consultados
        for(var i in filtros){ //for que concatena string de consulta
            if(!(filtros[i]==='')){ //si tiene contenido el filtro lo coloco
                resultado+=" and "+i+"='"+filtros[i]+"'"; //tomamos los filtros concatenados para consulta
            }
        }
        pool.query('select matricula,tipo,marca,modelo,color,anio,kilometraje,precio from Vehiculo where estado=0 and id_sucursal=10'+resultado+';'); //id_suc esta en 10 mientras
    }

    public rentVehicle(req:Request, res:Response){
        var matricula=req.params.matricula;
        pool.query('select region from Direccion_sucursal where id_sucursal=10;',(err:Error,region_rd:queryCallback)=>{
            //preguntar por uso de dataStore
        });

    }
}


const rentController= new RentController();
export default rentController;