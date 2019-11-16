import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
//import {FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RentComponent } from './components/rent/rent.component';
import { VehiclesListComponent } from './components/vehicles-list/vehicles-list.component';
import { RentService} from './services/rent.service';
import { RentDetailsComponent } from './components/rent-details/rent-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RentComponent,
    VehiclesListComponent,
    RentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    RentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
