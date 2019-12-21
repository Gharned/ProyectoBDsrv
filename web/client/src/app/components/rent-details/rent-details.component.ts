import { Component, OnInit } from '@angular/core';
import { RentService } from '../../services/rent.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-rent-details',
  templateUrl: './rent-details.component.html',
  styleUrls: ['./rent-details.component.css']
})
export class RentDetailsComponent implements OnInit {

  details:any; //almacena detalles de la renta
  checkoutFormClient:any; //almacena datos del formulario del cliente

  constructor(private rentService:RentService, private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder, private router:Router) { }

  ngOnInit() {
    const params=this.activatedRoute.snapshot.params; //tomo el parametro matricula dentro de la ruta (url)
    this.rentService.getReserve(params.matricula).subscribe(
    res=>{
        this.details=res;
      },
      err=>console.log(err)
    );
    this.checkoutFormClient=this.formBuilder.group({ //se inicializa el formulario de filtro
      rut_cliente:"",
      primer_nom:"",
      apellido_pat:"",
      apellido_mat:"",
      telefono:"",
      email:"",
      fecha_nac:""
    }); 
  }

  onSubmit(customerForm) { //se verifica el formulario de filtro
    // Process checkout data here
    
    this.rentService.postFinishReserve(customerForm).subscribe(
      res=>{
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    );
    this.checkoutFormClient.reset();
    this.router.navigate(['/rent']); //cuando almacene los valores, lo envio a la ruta principal
    
  }

}
