const customer={}

//pasar datos necesarios
// 1.-Sucursales para elegir
customer.infSuc=(req,res)=>{
    req.getConnection((err,conn)=>{
        conn.query('select id_sucursal,region from Direccion_sucursal;',(err,sucursales)=>{
            if(err){
                res.json(err);
            }
            console.log(sucursales);
            res.render('init',{
                data: sucursales,
            });
        });

        
    });
};

module.exports=customer;