import { Component } from '@angular/core';

//@component es un decorador: una funcionalidad que se le aplica a una clase
//y modifica el comportamiento que tiene la clase, osea caracteristicas y propiedades del componente
//selector es la etiqueta que tendra mi componente dentro de angular
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
}
