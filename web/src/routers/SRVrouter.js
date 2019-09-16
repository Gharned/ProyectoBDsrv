const express=require("express");
const router=express.Router();

/*necesito la importacion de controladores para
ejecutar metodos cuando llamo rutas
*/
const contrCustomer=require("../controllers/contrCustomer");

router.get("/",contrCustomer.infSuc);
router.post('/buscar',contrCustomer.dispVehiculos);

//buscar otras maneras, mas adelante
router.post('/filtrar/:id/:fecha_r/:fecha_d',contrCustomer.paramFilter);

router.get('/arrendar/:matricula/:id/:fecha_r/:fecha_d',contrCustomer.arrendar);

router.post('/finalizada',contrCustomer.finalizar);

module.exports=router; //exportar metodos permitidos para
//estas rutas