import { Component, OnInit } from '@angular/core';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { RentService } from 'src/app/services/rent.service';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  hoveredDate: NgbDate; 

  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private rentService:RentService) { //utilizara rent service
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.rentService.saveFechas(this.fromDate,true); //codigo implementado, llamo a rentService para guardar fechas
    this.rentService.saveFechas(this.toDate,false);
  }

  ngOnInit() {
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.rentService.saveFechas(this.fromDate,true); //llamo a rentService para obtener fechas
      this.rentService.saveFechas(this.toDate,false);
    } else {
      this.toDate = null;
      this.fromDate = date;
    
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  

}
