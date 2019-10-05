const customer={}

var dataStore; //guarada lo que sera insertado en la renta y se gestionara de pagina en pagina

customer.infSuc=(req,res)=>{
    req.getConnection((err,conn)=>{
        //esta me almacenara los datos junto a sucursales respectivas
        conn.query('select id_sucursal,region from Direccion_sucursal;',(err,sucursales)=>{
            res.render('vPrincipal',{ //le mandamos a vPrincipal las 2 querys hechas
                dataSuc: sucursales,
            });
        });
    });
};

customer.dispVehiculos=(req,res)=>{   //buscare los vehiculos que no están rentados de esa sucursal
    //obtengo el id de la sucursal que se encontrará en una region de retiro
    dataStore=req.body;
    //aqui si no se eligio local de devolucion se deja en el mismo ,  if..
    console.log(dataStore);
    //----ATENCION AQUIII ES DONDE SE NECESITA GUARDAR LA SUCURSAL DEVOL Y RETIRO QUE FUE SELECCIONADA-----
    // SE DEBE PASAR POR ACA Y SER ASIGNADA A dataStore. HASTA AHORA SOLO SE TIENEN LAS 2 FECHAS

    

    req.getConnection((err,conn)=>{
        conn.query('select matricula,tipo,marca,modelo,color,anio,kilometraje,precio from Vehiculo where estado=0 and id_sucursal=?',[dataStore.local_retiro],(err,vehiculos)=>{
            //envio vehiculos a la pagina redireccionada
            res.render('vCatalogo',{
                data:vehiculos,
                dataStore,
            });
        });
    });
};


customer.paramFilter=(req,res)=>{  //desde aqui debiese tener mi local_r y local_d
    const filtros=req.body; //trae parametros de para el filtro
    //console.log(filtros);
    var resultado=""; //guadara un string, con los filtros que seran consultados
    for(var i in filtros){ //for que concatena string de consulta
        if(!(filtros[i]==='')){ //si tiene contenido el filtro lo coloco
            resultado+=" and "+i+"='"+filtros[i]+"'"; //tomamos los filtros concatenados para consulta
        }
    }
    //console.log(resultado);
    req.getConnection((err,conn)=>{
        conn.query('select matricula,tipo,marca,modelo,color,anio,kilometraje,precio from Vehiculo where estado=0 and id_sucursal=?'+resultado+';',[dataStore.local_retiro],(err,fvehiculos)=>{
            res.render('vCatalogo',{
                data:fvehiculos,
                dataStore,
            });
        });
    });
};


customer.arrendar=(req,res)=>{
    dataStore.matricula=req.params.matricula;
    req.getConnection((err,conn)=>{
        //para conceguir la de "retiro", "devolucion" -->cuando se arregle, hacer 2 querys
        conn.query('select region from Direccion_sucursal where id_sucursal=?;',[dataStore.local_retiro],(err,region_rd)=>{
            //guardo regiones
            dataStore.region_retiro=region_rd[0].region;
            dataStore.region_devolucion=region_rd[0].region; //deviesen ser 2 querys
            //console.log(dataStore);
            conn.query('select calle,numero,ciudad,region from Sucursal as s inner join Direccion_sucursal as ds on s.id_sucursal=ds.id_sucursal where s.id_sucursal=?;',[dataStore.local_retiro],(err,datos_retiro)=>{
                conn.query('select calle,numero,ciudad,region from Sucursal as s inner join Direccion_sucursal as ds on s.id_sucursal=ds.id_sucursal where s.id_sucursal=?;',[dataStore.local_devolucion],(err,datos_devolucion)=>{
                    conn.query('select marca, modelo, precio from Vehiculo as v where v.matricula=?;',[dataStore.matricula],(err,datos_veh)=>{
                        conn.query('select datediff(?,?) as dias;',[dataStore.fecha_devolucion,dataStore.fecha_retiro],(err,difDias)=>{
                            if(err){
                                console.log('Error con obtencion de datos del vehiculo');
                            }else{
                                res.render('vArriendo',{
                                    dataStore,
                                    dataRetiro:datos_retiro,
                                    dataDev:datos_devolucion,
                                    dataVeh:datos_veh,
                                    dataDias:difDias,
                                });
                            }
                        });
                    });
                });
            });
        });
    });
};


customer.finalizar=(req,res)=>{
    const cliente=req.body; //trae parametros del formulario cliente
    dataStore.rut_cliente=cliente.rut_cliente;
    dataStore.estado='En Curso';
    req.getConnection((err,conn)=>{
        //pregunto si ya existe el cliente la bd
        conn.query('select rut_cliente from Cliente where rut_cliente=?;',[cliente.rut_cliente],(err,rut)=>{
            if(Object.keys(rut).length === 0){ //pregunto si lo no lo encontro, hace esto
                conn.query('insert into Cliente (rut_cliente,telefono,email,fecha_nac) values (?,?,?,?);',[cliente.rut_cliente,cliente.telefono,cliente.email,cliente.fecha_nac],(err, exito)=>{
                    conn.query('insert into Nombre_cliente (rut_cliente,primer_nom,apellido_pat,apellido_mat) values (?,?,?,?);',[cliente.rut_cliente,cliente.primer_nom,cliente.apellido_pat,cliente.apellido_mat],(err, exito)=>{
                        conn.query('insert into Renta set ?;',[dataStore],(err,exito)=>{
                            conn.query('update Vehiculo set estado=1 where matricula=?;',[dataStore.matricula],(err,exito)=>{ //actualizo estado de vehiculo a rentado
                                res.redirect('/');
                            });
                        });
                    });
                });
            }else{ //si lo encontro
                conn.query('insert into Renta set ?;',[dataStore],(err,exito)=>{    
                    conn.query('update Vehiculo set estado=1 where matricula=?;',[dataStore.matricula],(err,exito)=>{ //actualizo estado de vehiculo a rentado
                        res.redirect('/');
                    });
                });
            }
        });
    });
};


module.exports=customer;