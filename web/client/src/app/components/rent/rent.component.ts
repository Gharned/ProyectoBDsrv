import { Component, OnInit ,HostBinding } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router} from  '@angular/router';

import {RentService} from '../../services/rent.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

  @HostBinding('class') classes='row';

  sucursales:any=[]; //guarda la peticion de sucursales
  checkoutForm:any;

  constructor(private rentService:RentService, private formBuilder:FormBuilder, private router:Router) { }

  ngOnInit() {
    this.rentService.getSucursales().subscribe(
      res=>{
        this.sucursales=res;  //almaceno la respuesta en sucursales
      },
      err=>console.error(err)
    );
    this.checkoutForm=this.formBuilder.group({
      fecha_retiro:"",
      fecha_devolucion:"",
      local_retiro:0,
      local_devolucion:0
    });
  }

  onSubmit(customerData) {
    // Process checkout data here
    this.rentService.storeForm(customerData);
    this.checkoutForm.reset();
    this.router.navigate(['/rent/search']); //cuando almacene los valores quiero enviarlo a la ruta..
  }

}
