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

  getSucursales(){
    return this.http.get(this.INDEX_URI);
  }
  postSearch(){
    return this.http.post(`${this.API_URI}/rent/search`,this.store);
  }
  postFilter(customerFilter:any){
    return this.http.post(`${this.API_URI}/rent/filter`,customerFilter)
  }

}
