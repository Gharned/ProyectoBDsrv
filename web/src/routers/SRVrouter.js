const express=require("express");
const router=express.Router();

/*necesito la importacion de controladores para
ejecutar metodos cuando llamo rutas
*/
const contrCustomer=require("../controllers/contrCustomer");

router.get("/",contrCustomer.infSuc);
router.post('/buscar',contrCustomer.dispVehiculos);
router.post('/filtrar',contrCustomer.paramFilter);

module.exports=router; //exportar metodos permitidos para
//estas rutas