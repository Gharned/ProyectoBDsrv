import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //modulo que me permite pedir datos

@Injectable({
  providedIn: 'root'
})
export class RentService {

  INDEX_URI='http://localhost:3000/';
  API_URI='http://localhost:3000/api';
  store:any; //almacena los datos del formulario sucursal para ser enviada


  constructor(private http:HttpClient) { }

  storeForm(sucursal:any){
    this.store=sucursal;
  }
  

  getSucursales(){ //obtengo sucursales
    return this.http.get(this.INDEX_URI);
  }
  postSearch(){ //se busca en la sucursal
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
