import { Component, OnInit, Injectable } from '@angular/core';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { RentService } from 'src/app/services/rent.service';
import {NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap'; //me permitira configurar timepicker


@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

  fromModel(value: string): NgbTimeStruct {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }

  toModel(time: NgbTimeStruct): string {
    if (!time) {
      return null;
    }
    return `${this.pad(time.hour)}:${this.pad(time.minute)}:${this.pad(time.second)}`;
  }

  private pad(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }
}

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.css'],
  // NOTE: For this example we are only providing current component, but probably
  // NOTE: you will want to provide your main App Module
  providers: [{ provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}, NgbTimepickerConfig]
})
export class TimepickerComponent implements OnInit {
  time: '13:30:00';
  @Input() tipo; //sera TRUE cuando sea de retiro, FALSE cuando sea devolucion
  
  constructor(private rentService:RentService, config: NgbTimepickerConfig) {
    config.readonlyInputs = true; //permite deshabilitar la escritura en los inputs de timepicker
   }
  
  ngOnInit() {
  }
  
  saveHoras(){ //guarda la hora puesta en una variable de rentService
    this.rentService.saveHoras(this.time,this.tipo);
  }
  
}
