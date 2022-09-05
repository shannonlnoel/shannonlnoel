import { Component, Input, OnInit } from '@angular/core';
import { BookingType } from 'src/app/models/booking-type';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-associative-btype',
  templateUrl: './associative-btype.component.html',
  styleUrls: ['./associative-btype.component.scss'],
})
export class AssociativeBtypeComponent implements OnInit {
  @Input() bookingType: BookingType
  constructor(public global: GlobalService) { }

  ngOnInit() {}

}
