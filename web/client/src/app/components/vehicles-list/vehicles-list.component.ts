import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";

import {RentService} from  '../../services/rent.service';

//permitira listar los vehiculos que tiene la base de datos
@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {

  //ATTIBUTES
  vehicle:any;
  checkoutFormFilter:any;
  progressBar:number;

  constructor(private rentService: RentService, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.progressBar=0;
    this.rentService.postSearch().subscribe( //se busca en la sucursal
      res=>{
        this.vehicle=res;  //almaceno la respuesta en vehiculo
      },
      err=>console.error(err)
    );
    this.checkoutFormFilter=this.formBuilder.group({ //se inicializa el formulario de filtro
      tipo:"",
      marca:"",
      modelo:"",
      anio:"",
      kilometraje:""
    });  
  }

  onSubmit(customerFilter) { //se verifica el formulario de filtro
    // Process checkout data here
    this.rentService.postFilter(customerFilter).subscribe(
      res=>{
        this.vehicle=res;  //almaceno la respuesta en vehiculo
      },
      err=>console.error(err)
    );
    this.checkoutFormFilter.reset();
  }


}
