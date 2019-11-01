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
class SinisterController {
    showSinister(req, res) {
        res.send("Estoy en la vista siniestro");
    }
    sentSiniestro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var formulario = req.body;
            yield database_1.default.query('insert into Siniestro (matricula,fecha_siniestro,descripcion,nombre_respon) values (?,?,?,?)', [formulario.matricula, formulario.fecha_siniestro, formulario.descripcion, formulario.nombre_respon]);
            res.send({ message: 'Exito' });
        });
    }
}
const sinisterController = new SinisterController();
exports.default = sinisterController;
