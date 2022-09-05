import { Component, Input } from '@angular/core';
import { BookingType } from 'src/app/models/booking-type';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-btype',
  templateUrl: './view-btype.component.html',
  styleUrls: ['./view-btype.component.scss'],
})
export class ViewBtypeComponent {
  @Input() bookingType:BookingType;
  constructor(public global:GlobalService) { }

}
