import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; //se necesita para datetimepicker

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RentComponent } from './components/rent/rent.component';
import { VehiclesListComponent } from './components/vehicles-list/vehicles-list.component';
import { RentService} from './services/rent.service';
import { RentDetailsComponent } from './components/rent-details/rent-details.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { TimepickerComponent } from './components/timepicker/timepicker.component';
import { LoginBarComponent } from './components/login-bar/login-bar.component';
//import { AlertMessageComponent } from './components/alert-message/alert-message.component'; //es un componente


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RentComponent,
    VehiclesListComponent,
    RentDetailsComponent,
    DatepickerComponent,
    TimepickerComponent,
    LoginBarComponent,
  //  AlertMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    RentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
