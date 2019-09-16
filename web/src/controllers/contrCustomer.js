const customer={}

//pasar datos necesarios
// 1.-Sucursales para elegir
customer.infSuc=(req,res)=>{
    req.getConnection((err,conn)=>{
        conn.query('select distinct region from Direccion_sucursal;',(err,regiones)=>{
            if(err){
                res.json(err);
            }
            //esta me almacenara los datos junto a sucursales respectivas
            conn.query('select id_sucursal,region from Direccion_sucursal;',(err,sucursales)=>{
                if(err){
                    res.json(err);
                }
                res.render('vPrincipal',{ //le mandamos a vPrincipal las 2 querys hechas
                    dataRegion: regiones,
                    dataSuc: sucursales,
                });
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

//quizas alla que arreglarlo, es lo unico que se me ocurrio
customer.paramFilter=(req,res)=>{
    const filtros=req.body; //trae parametros de para el filtro
    var dataStore=new Object(); //rellenado al objeto
    dataStore.id_sucursal=req.params.id;
    dataStore.fecha_retiro=req.params.fecha_r;
    dataStore.fecha_devolucion=req.params.fecha_d;

    var resultado=""; //guadara consulta concatenada en for
    for(var i in filtros){
        if(!(filtros[i]==='')){ //si tiene contenido el filtro lo coloco
            resultado+=" and "+i+"='"+filtros[i]+"'";
        }
    }
    //console.log(resultado);
    req.getConnection((err,conn)=>{
        conn.query('select matricula,tipo,marca,modelo,color,anio,kilometraje,precio from Vehiculo where estado=1 and id_sucursal=?'+resultado+';',[dataStore.id_sucursal],(err,fvehiculos)=>{
            if(err){
                console.log('Error con obtencion de vehiculos por filtro');
            }
            res.render('vDispVehiculos',{
                data:fvehiculos,
                dataStore:dataStore,
            });
        });
    });
};



module.exports=customer;