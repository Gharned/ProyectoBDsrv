"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rentController_1 = __importDefault(require("../controllers/rentController"));
class RentRoutes {
    constructor() {
        //ATTRIBUTE
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/search', rentController_1.default.search);
    }
}
const rentRoutes = new RentRoutes();
exports.default = rentRoutes.router;
