import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-booking-info',
  templateUrl: './view-booking-info.component.html',
  styleUrls: ['./view-booking-info.component.scss'],
})
export class ViewBookingInfoComponent implements OnInit {

  @Input() booking: any;
  @Input() bookingAttendance: any;

  constructor(public global:GlobalService) { }

  ngOnInit() {}

}
