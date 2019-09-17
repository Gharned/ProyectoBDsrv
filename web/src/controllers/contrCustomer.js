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
            res.render('vCatalogo',{
                data:vehiculos,
                dataStore:req.body,
            });
        });
    });
};

//quizas alla que arreglarlo, es lo unico que se me ocurrio
customer.paramFilter=(req,res)=>{  //desde aqui debiese tener mi local_r y local_d
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
            res.render('vCatalogo',{
                data:fvehiculos,
                dataStore:dataStore,
            });
        });
    });
};

//nota: ya deberia tener la regio, por el seleccionado de vPrincipal, pero no
customer.arrendar=(req,res)=>{
    var dataStore=new Object(); //rellenado al objeto
    dataStore.matricula=req.params.matricula;
    dataStore.local_retiro=req.params.id; //este será mientras tanto el local de retiro y devolucion
    dataStore.local_devolucion=req.params.id;// lo que dije arriba

    dataStore.fecha_retiro=req.params.fecha_r;
    dataStore.fecha_devolucion=req.params.fecha_d;
    req.getConnection((err,conn)=>{
        //para conceguir la de "retiro", "devolucion" -->cuando se arregle, hacer 2 querys
        conn.query('select region from Direccion_sucursal where id_sucursal=?;',[dataStore.local_retiro],(err,region_rd)=>{
            if(err){
                console.log("No se encontro la region");
            }
            dataStore.region_retiro=region_rd[0].region;
            dataStore.region_devolucion=region_rd[0].region; //deviesen ser 2 querys
            //console.log(dataStore);
            conn.query('select calle,numero,ciudad,region from Sucursal as s inner join Direccion_sucursal as ds on s.id_sucursal=ds.id_sucursal where s.id_sucursal=?;',[dataStore.local_retiro],(err,datos_retiro)=>{
                conn.query('select calle,numero,ciudad,region from Sucursal as s inner join Direccion_sucursal as ds on s.id_sucursal=ds.id_sucursal where s.id_sucursal=?;',[dataStore.local_devolucion],(err,datos_devolucion)=>{
                    conn.query('select marca, modelo, precio from Vehiculo as v where v.matricula=?;',[dataStore.matricula],(err,datos_veh)=>{
                        conn.query('select datediff(?,?) as dias;',[dataStore.fecha_devolucion,dataStore.fecha_retiro],(err,difDias)=>{
                            if(err){
                                console.log('Error con obtencion de datos del vehiculo');
                            }
                            res.render('vArriendo',{
                                dataSto:dataStore,
                                dataRetiro:datos_retiro,
                                dataDev:datos_devolucion,
                                dataVeh:datos_veh,
                                dataDias:difDias,
                            });
                        });
                    });
                });
            });
        });
    });
};

//en otra version ver si dataStore puede funcionar como variable global -> a no ser que influya en todos los customers

customer.finalizar=(req,res)=>{
    var dataStore=new Object();
    dataStore.matricula=req.params.matricula;
    dataStore.local_retiro=req.params.local_retiro; 
    dataStore.local_devolucion=req.params.local_devolucion;
    dataStore.fecha_retiro=req.params.fecha_retiro;
    dataStore.fecha_devolucion=req.params.fecha_devolucion;
    dataStore.region_retiro=req.params.region_retiro;
    dataStore.region_devolucion=req.params.region_devolucion;
    //----------------------------------------------------------
    const cliente=req.body; //trae parametros del formulario cliente
    dataStore.rut_cliente=cliente.rut_cliente;
    dataStore.estado='En Curso';
    req.getConnection((err,conn)=>{
        //pregunto si ya existe el cliente la bd
        conn.query('select rut_cliente from Cliente where rut_cliente=?;',[cliente.rut_cliente],(err,rut)=>{
            if(err){
                console.log("Error al conseguir rut del cliente");
            }else{
                if(Object.keys(rut).length === 0){ //pregunto si lo no lo encontro, hace esto
                    conn.query('insert into Cliente (rut_cliente,telefono,email,fecha_nac) values (?,?,?,?);',[cliente.rut_cliente,cliente.telefono,cliente.email,cliente.fecha_nac],(err, exito)=>{
                        if(err){
                            console.log("Error al insertar en Cliente");
                        }
                        conn.query('insert into Nombre_cliente (rut_cliente,primer_nom,apellido_pat,apellido_mat) values (?,?,?,?);',[cliente.rut_cliente,cliente.primer_nom,cliente.apellido_pat,cliente.apellido_mat],(err, exito)=>{
                            if(err){
                                console.log("Error al insertar en Nombre_cliente");
                            }
                            conn.query('insert into Renta set ?;',[dataStore],(err,exito)=>{
                                if(err){
                                    console.log("Error al insertar en Renta");
                                }
                                conn.query('update Vehiculo set estado=1 where matricula=?;',[dataStore.matricula],(err,exito)=>{ //actualizo estado de vehiculo a rentado
                                    if(err){
                                        console.log("Error al actualizar en Vehiculo");
                                    }
                                    res.redirect('/');
                                });
                            });
                        });
                    });
                }else{ //si lo encontro
                    conn.query('insert into Renta set ?;',[dataStore],(err,exito)=>{ 
                        if(err){
                            console.log("Error al insertar en Renta");
                        }
                        conn.query('update Vehiculo set estado=1 where matricula=?;',[dataStore.matricula],(err,exito)=>{ //actualizo estado de vehiculo a rentado
                            if(err){
                                console.log("Error al actualizar en Vehiculo");
                            }
                            res.redirect('/');
                        });
                    });
                }
            }
        });
    });
};


module.exports=customer;