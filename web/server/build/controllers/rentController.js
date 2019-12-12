"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
//import { queryCallback } from "mysql";
class RentController {
    //METHODS
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            RentController.dataStore = req.body; //se obtiene, fecha_dev, fecha_ret, local_dev y local_dev
            const region_r = yield database_1.default.query('select region from Direccion_sucursal where id_sucursal=?', [RentController.dataStore.local_retiro]); //asigno region ret
            const region_d = yield database_1.default.query('select region from Direccion_sucursal where id_sucursal=?', [RentController.dataStore.local_devolucion]); //asigno region dev
            RentController.dataStore.region_retiro = region_r[0].region; //ya que es rowData rento que usar indice
            RentController.dataStore.region_devolucion = region_d[0].region;
            //console.log(RentController.dataStore);
            const vehiculos = yield database_1.default.query('select matricula,tipo,marca,modelo,color,anio,kilometraje,precio,image_url from Vehiculo where estado=0 and id_sucursal=?', [RentController.dataStore.local_retiro]);
            res.send(vehiculos);
        });
    }
    filter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var filtros = req.body; //trae parametros de para el filtro
            //console.log(filtros);
            var resultado = ""; //guadara un string, con los filtros que seran consultados
            for (var i in filtros) { //for que concatena string de consulta
                if ((!(filtros[i] === '')) && (!(filtros[i] === null))) { //si tiene contenido el filtro lo coloco
                    resultado += " and " + i + "='" + filtros[i] + "'"; //tomamos los filtros concatenados para consulta
                }
            }
            //vehiculos filtrados
            const fVehiculos = yield database_1.default.query('select matricula,tipo,marca,modelo,color,anio,kilometraje,precio,image_url from Vehiculo where estado=0 and id_sucursal=?' + resultado + ';', [RentController.dataStore.local_retiro]);
            res.send(fVehiculos);
        });
    }
    reserveVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            RentController.dataStore.matricula = req.params.matricula;
            const dataVeh = (yield database_1.default.query('select marca, modelo, precio from Vehiculo as v where v.matricula=?;', [RentController.dataStore.matricula])); //obtengo detalles del vehiculo
            const dataRet = (yield database_1.default.query('select calle,numero,ciudad,region from Direccion_sucursal where id_sucursal=?;', [RentController.dataStore.local_retiro])); //asigno detalles
            const dataDev = (yield database_1.default.query('select calle,numero,ciudad,region from Direccion_sucursal where id_sucursal=?;', [RentController.dataStore.local_devolucion])); //asigno detalles
            const difDias = (yield database_1.default.query('select datediff(?,?) as dias;', [RentController.dataStore.fecha_devolucion, RentController.dataStore.fecha_retiro])); //obtengo dias que usara el vehiculo para detalles
            const datos = {
                dataVeh,
                dataRet,
                dataDev,
                difDias
            };
            res.send(datos);
        });
    }
    finishied(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = req.body;
            RentController.dataStore.rut_cliente = cliente.rut_cliente;
            RentController.dataStore.estado = 'En Curso';
            const existeRut = yield database_1.default.query('select rut_cliente from Cliente where rut_cliente=?;', [cliente.rut_cliente]);
            if (Object.keys(existeRut).length === 0) { //pregunto si existe el rut o no, si no existe inserto al nuevo cliente
                yield database_1.default.query('insert into Cliente (rut_cliente,telefono,email,fecha_nac) values (?,?,?,?);', [cliente.rut_cliente, cliente.telefono, cliente.email, cliente.fecha_nac]);
                yield database_1.default.query('insert into Nombre_cliente (rut_cliente,primer_nom,apellido_pat,apellido_mat) values (?,?,?,?);', [cliente.rut_cliente, cliente.primer_nom, cliente.apellido_pat, cliente.apellido_mat]);
            }
            yield database_1.default.query('insert into Renta set ?;', [RentController.dataStore]);
            yield database_1.default.query('update Vehiculo set estado=1 where matricula=?;', [RentController.dataStore.matricula]);
            res.send({ text: "exito" });
        });
    }
}
const rentController = new RentController();
exports.default = rentController;
