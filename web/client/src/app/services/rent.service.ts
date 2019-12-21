import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //modulo que me permite pedir datos

@Injectable({
  providedIn: 'root'
})
export class RentService {

  INDEX_URI='http://localhost:3000/';
  API_URI='http://localhost:3000/api';
  store:any; //almacena los datos del formulario sucursal para ser enviada en el metodo postSearch
  
  fecha_retiro:any;fecha_devolucion:any;hora_retiro:any;hora_devolucion:any; //retiros y devoluciones

  constructor(private http:HttpClient) { }

  storeForm(sucursal:any){ //almacena los datos del formulario para el componente 
    this.store=sucursal;
  }


  //fromOrTo es TRUE cuando es From, es FALSE cuando es To
  saveFechas(fecha:any, fromOrTo:boolean){ //concatena la fecha enviada a traves del formulario
    if(fromOrTo){ //fecha retiro
    /*  console.log("esto es from: ");*/
      this.fecha_retiro=fecha.year+"-"+fecha.month+"-"+fecha.day;
    }else{  //fecha devolucion
    /*  console.log("esto es To");*/
      this.fecha_devolucion=fecha.year+"-"+fecha.month+"-"+fecha.day;
    }
  }
  saveHoras(horario:any, fromOrTo:boolean){ //guardo las horas seleccionadas en el formulario
    if(fromOrTo){ //hora retiro
    /*  console.log("esto es from: ");*/
      this.hora_retiro=horario;
    }else{  //hora devolucion
    /*  console.log("esto es To: ");*/
      this.hora_devolucion=horario;
    }
  }
  
  getFechaRet(){
    return this.fecha_retiro;
  }
  getFechaDev(){
    return this.fecha_devolucion;
  }
  getHoraRet(){
    return this.hora_retiro;
  }
  getHoraDev(){
    return this.hora_devolucion;
  }

  //PETICIONES HTTP
  getSucursales(){ //obtengo sucursales
    return this.http.get(this.INDEX_URI);
  }
  postSearch(){ //se busca en la sucursal los vehiculos disponibles
    return this.http.post(`${this.API_URI}/rent/search`,this.store);
  }
  postFilter(customerFilter:any){ //se filtra caracteristicas en el vehiculo
    return this.http.post(`${this.API_URI}/rent/filter`,customerFilter);
  }
  getReserve(matricula: string){ //se reserva el auto con esa matricula
    return this.http.get(`${this.API_URI}/rent/reserve/${matricula}`);
  }
  postFinishReserve(customerForm:any){ //se envia el formulario de los datos del clientes
    return this.http.post(`${this.API_URI}/rent/finalizar`,customerForm);
  }

}
