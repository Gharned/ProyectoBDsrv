const customer={}

//pasar datos necesarios
// 1.-Sucursales para elegir
customer.infSuc=(req,res)=>{
    req.getConnection((err,conn)=>{
        conn.query('select id_sucursal,region from Direccion_sucursal;',(err,sucursales)=>{
            if(err){
                res.json(err);
            }
            //console.log(sucursales);
            res.render('vPrincipal',{
                data: sucursales,
            });
        });

        
    });
};

customer.dispVehiculos=(req,res)=>{
    //obtengo el id de la sucursal que se encontrará en una region
    // y buscare los vehiculos que no están rentados de esa sucursal
    const data=req.body;
    req.getConnection((err,conn)=>{
        conn.query('select matricula,tipo,marca,modelo,color,anio,kilometraje,precio from Vehiculo where estado=1 and id_sucursal=?',[data.id_sucursal],(err,vehiculos)=>{
            if(err){
                console.log('Error con obtencion de vehiculos');
            }
            //envio vehiculos a la pagina redireccionada
            res.render('vDispVehiculos',{
                data:vehiculos,
                dataStore:req.body,
            });
        });
    });
};

customer.paramFilter=(req,res)=>{
    console.log(req);
};



module.exports=customer;