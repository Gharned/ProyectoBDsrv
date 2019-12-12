
import {Request, Response} from "express";
import pool from "../database";
//import { queryCallback } from "mysql";


class RentController{
    //ATRIBUTES
    private static dataStore: any; //static me ayuda en la solucion para ser usada sin una instansiar
    
    //METHODS
    public async search(req:Request, res:Response){ //despues le pongo async
        RentController.dataStore=req.body; //se obtiene, fecha_dev, fecha_ret, local_dev y local_dev

        const region_r = await pool.query('select region from Direccion_sucursal where id_sucursal=?',[RentController.dataStore.local_retiro]); //asigno region ret
        const region_d = await pool.query('select region from Direccion_sucursal where id_sucursal=?',[RentController.dataStore.local_devolucion]); //asigno region dev

        RentController.dataStore.region_retiro=region_r[0].region;  //ya que es rowData rento que usar indice
        RentController.dataStore.region_devolucion=region_d[0].region;

        //console.log(RentController.dataStore);
        
        const vehiculos = await pool.query('select matricula,tipo,marca,modelo,color,anio,kilometraje,precio,image_url from Vehiculo where estado=0 and id_sucursal=?',[RentController.dataStore.local_retiro]);
        res.send(vehiculos);
    }

    public async filter(req:Request, res:Response){
        var filtros=req.body; //trae parametros de para el filtro
        //console.log(filtros);
        var resultado=""; //guadara un string, con los filtros que seran consultados
        for(var i in filtros){ //for que concatena string de consulta
            if( (!(filtros[i]==='')) && (!(filtros[i]===null)) ){ //si tiene contenido el filtro lo coloco
                resultado+=" and "+i+"='"+filtros[i]+"'"; //tomamos los filtros concatenados para consulta
            }
        }
        //vehiculos filtrados
        const fVehiculos= await pool.query('select matricula,tipo,marca,modelo,color,anio,kilometraje,precio,image_url from Vehiculo where estado=0 and id_sucursal=?'+resultado+';',[RentController.dataStore.local_retiro]);
        res.send(fVehiculos);    
    }
    
    public async reserveVehicle(req:Request, res:Response){
        RentController.dataStore.matricula=req.params.matricula;
        const dataVeh= (await pool.query('select marca, modelo, precio from Vehiculo as v where v.matricula=?;',[RentController.dataStore.matricula])); //obtengo detalles del vehiculo
        const dataRet=(await pool.query('select calle,numero,ciudad,region from Direccion_sucursal where id_sucursal=?;',[RentController.dataStore.local_retiro])); //asigno detalles
        const dataDev=(await pool.query('select calle,numero,ciudad,region from Direccion_sucursal where id_sucursal=?;',[RentController.dataStore.local_devolucion])); //asigno detalles
        const difDias =(await pool.query('select datediff(?,?) as dias;',[RentController.dataStore.fecha_devolucion,RentController.dataStore.fecha_retiro])); //obtengo dias que usara el vehiculo para detalles
        
        const datos={
            dataVeh,
            dataRet,
            dataDev,
            difDias
        };

        res.send(datos);
    }

    public async finishied(req:Request, res:Response){
        
        const cliente=req.body;
        RentController.dataStore.rut_cliente=cliente.rut_cliente;
        RentController.dataStore.estado='En Curso';

        const existeRut = await pool.query('select rut_cliente from Cliente where rut_cliente=?;',[cliente.rut_cliente]);
        if(Object.keys(existeRut).length === 0){ //pregunto si existe el rut o no, si no existe inserto al nuevo cliente
            await pool.query('insert into Cliente (rut_cliente,telefono,email,fecha_nac) values (?,?,?,?);',[cliente.rut_cliente,cliente.telefono,cliente.email,cliente.fecha_nac]);
            await pool.query('insert into Nombre_cliente (rut_cliente,primer_nom,apellido_pat,apellido_mat) values (?,?,?,?);',[cliente.rut_cliente,cliente.primer_nom,cliente.apellido_pat,cliente.apellido_mat]);
        }
        await pool.query('insert into Renta set ?;',[RentController.dataStore]);
        await pool.query('update Vehiculo set estado=1 where matricula=?;',[RentController.dataStore.matricula]);
        
        res.send({text:"exito"});
    }
    
}


const rentController= new RentController();
export default rentController;