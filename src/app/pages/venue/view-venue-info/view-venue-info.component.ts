import { Component, Input} from '@angular/core';
import { Venue } from 'src/app/models/venue';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-venue-info',
  templateUrl: './view-venue-info.component.html',
  styleUrls: ['./view-venue-info.component.scss'],
})
export class ViewVenueInfoComponent {

  @Input() venue: Venue;
  
  constructor(public global: GlobalService) { 
  }

}

