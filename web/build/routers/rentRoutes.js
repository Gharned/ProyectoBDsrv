"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class RentRoutes {
    constructor() {
        //ATTRIBUTE
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('RENTS'));
    }
}
const rentRoutes = new RentRoutes();
exports.default = rentRoutes.router;
