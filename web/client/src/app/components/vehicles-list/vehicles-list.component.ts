import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder } from "@angular/forms";

import {RentService} from  '../../services/rent.service';

//permitira listar los vehiculos que tiene la base de datos
@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {

  vehicle:any;
  checkoutFormFilter:any;

  constructor(private rentService: RentService, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.rentService.postSearch().subscribe(
      res=>{
        this.vehicle=res;  //almaceno la respuesta en vehiculo
      },
      err=>console.error(err)
    );
    this.checkoutFormFilter=this.formBuilder.group({
      tipo:"",
      marca:"",
      modelo:"",
      anio:"",
      kilometraje:""
    });  
  }
  

  onSubmit(customerFilter) {
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