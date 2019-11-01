import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RentComponent} from './components/rent/rent.component';
import { VehiclesListComponent } from './components/vehicles-list/vehicles-list.component';

//me permite definir rutas de mi app
const routes: Routes = [
  {
    path:'',
    redirectTo:'/rent',
    pathMatch:'full'
  },
  {
    path:'rent',
    component:RentComponent
  },
  {
    path:'rent/search',
    component:VehiclesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
