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
    const data=req.body; //contiene id_sucursal,fecha_retiro,fecha_devolucion
    
    req.getConnection((err,conn)=>{
        conn.query('select tipo,marca,modelo,color,anio,kilometraje,precio from Vehiculo where id_sucursal=?',[id],(err,vehiculos)=>{
            if(err){
                console.log('Error con obtencion de vehiculos');
            }
            //envio vehiculos a la pagina redireccionada
            res.send('vDispVehiculos',{
                data:vehiculos,
            });
        });
    });
};

customer.paramFilter=(req,res)=>{
    console.log(req);
};



module.exports=customer;