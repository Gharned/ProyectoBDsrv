"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class RentController {
    search(req, res) {
        var hello = req.body;
        //res.send(hello);
        this.dataStore = hello; //se obtiene, fecha_dev, fecha_ret, local_dev y local_dev
        //res.send(this.dataStore);
        //const vehiculos = await pool.query('select matricula,tipo,marca,modelo,color,anio,kilometraje,precio from Vehiculo where estado=0 and id_sucursal=?',,[this.dataStore.local_retiro]);
    }
    filter(req, res) {
        var filtros = req.body; //trae parametros de para el filtro
        console.log(filtros);
        var resultado = ""; //guadara un string, con los filtros que seran consultados
        for (var i in filtros) { //for que concatena string de consulta
            if (!(filtros[i] === '')) { //si tiene contenido el filtro lo coloco
                resultado += " and " + i + "='" + filtros[i] + "'"; //tomamos los filtros concatenados para consulta
            }
        }
        database_1.default.query('select matricula,tipo,marca,modelo,color,anio,kilometraje,precio from Vehiculo where estado=0 and id_sucursal=10' + resultado + ';'); //id_suc esta en 10 mientras
    }
    rentVehicle(req, res) {
        var matricula = req.params.matricula;
        database_1.default.query('select region from Direccion_sucursal where id_sucursal=10;', (err, region_rd) => {
            //preguntar por uso de dataStore
        });
    }
}
const rentController = new RentController();
exports.default = rentController;
