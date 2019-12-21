import { Component, OnInit ,HostBinding } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router} from  '@angular/router';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import {RentService} from '../../services/rent.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

  @HostBinding('class') classes='row';

  //ATTRIBUTES
  sucursales:any=[]; //Guarda la peticion de sucursales
  checkoutForm:any; //Datos del formulario
  private _error = new Subject<string>();
  errorMessage: string; //Muestra mensaje cuando no estan completos los datos
  progressBar:number; //Progreso de la barra
  local_ret:boolean;local_dev:boolean;

  constructor(private rentService:RentService, private formBuilder:FormBuilder, private router:Router) { }

  ngOnInit() {
    this.progressBar=0; //barra de progreso inicial
    this.local_ret=false;this.local_dev=false; //estado inicial, no seleccionado
    this.rentService.getSucursales().subscribe(  //otengo las sucursales para mostrar
      res=>{
        this.sucursales=res;  //almaceno la respuesta en sucursales
      },
      err=>console.error(err)
    );
    this.checkoutForm=this.formBuilder.group({  //inicializo el formulario con valores nulos
      fecha_retiro:"",
      fecha_devolucion:"",
      local_retiro:0,
      local_devolucion:0
    });
    this._error.subscribe((message) => this.errorMessage = message); //forma que actuara el menssaje de error
      this._error.pipe(
       debounceTime(5000) //milisegundos que demora en desaparecer el mensaje
      ).subscribe(() => this.errorMessage = null);
  }

  //Es llamada cuando se selecciona un elemento, para que la barra de progreso aumente
  incrementProgressBar(elem:string){
    if( (elem=='local_ret') && (this.local_ret==false) ){ //si no estaba seleccionada
      this.local_ret=true;  //se selescciono
      this.progressBar+=15; //aumento el progreso
    }else{
      if((elem=='local_dev') && (this.local_dev==false)){
        this.local_dev=true;
        this.progressBar+=15;
      }
    }
  }


  onSubmit(customerData) { //Al presionar boton de enviar
    //VERIFICA QUE TODOS LOS PARAMETROS ESTEN SELECCIONADOS Y COMPLETOS
    if(!(this.rentService.getFechaRet()=="") && !(this.rentService.getHoraRet()==undefined) && !(this.rentService.getFechaDev()=="") && !(this.rentService.getHoraDev()==undefined) && !(customerData.local_retiro=="") && !(customerData.local_devolucion=="")){
      customerData.fecha_retiro=this.rentService.getFechaRet()+" "+this.rentService.getHoraRet();
      customerData.fecha_devolucion=this.rentService.getFechaDev()+" "+this.rentService.getHoraDev();
      console.log(customerData);
      this.rentService.storeForm(customerData); //se almacena los datos del formulario
      this.checkoutForm.reset(); //reseteo del formulario
      this.router.navigate(['/rent/search']); //cuando almacene los valores, quiero enviarlo a la ruta..

    }else{ //Si no esta completo, aqui debe ir un mensaje de error activado con un metodo listener
      this._error.next("Complete todos los datos");
    }
  }

}
