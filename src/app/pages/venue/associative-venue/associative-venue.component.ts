import { Component, Input, OnInit } from '@angular/core';
import { Venue } from 'src/app/models/venue';
import { GlobalService } from 'src/app/services/global/global.service';
@Component({
  selector: 'app-associative-venue',
  templateUrl: './associative-venue.component.html',
  styleUrls: ['./associative-venue.component.scss'],
})



export class AssociativeVenueComponent implements OnInit {
  @Input() venue: Venue;

  constructor(public global: GlobalService) { }

  ngOnInit() {}

}
