"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sinisterController_1 = __importDefault(require("../controllers/sinisterController"));
class SinisterRoutes {
    constructor() {
        //ATTRIBUTE
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', sinisterController_1.default.showSinister); //visualizara la pagina siniestro
        this.router.post('/send', sinisterController_1.default.sentSiniestro);
    }
}
const sinisterRoutes = new SinisterRoutes();
exports.default = sinisterRoutes.router;
