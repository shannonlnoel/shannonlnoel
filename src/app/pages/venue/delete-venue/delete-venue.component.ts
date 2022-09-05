/* eslint-disable @typescript-eslint/quotes */
import { Component, Input} from '@angular/core';
import { Venue } from 'src/app/models/venue';
import { GlobalService } from 'src/app/services/global/global.service';
import { VenueService } from 'src/app/services/venue/venue.service';

@Component({
  selector: 'app-delete-venue',
  templateUrl: './delete-venue.component.html',
  styleUrls: ['./delete-venue.component.scss'],
})
export class DeleteVenueComponent {
  @Input() venue: Venue;

  constructor(public global: GlobalService,
    public venueService: VenueService) { }


  //Send through the id of the selected venue to be deleted in the venue service.
  delete(id: number){
    this.venueService.deleteVenue(id);
    this.global.dismissModal();
    this.global.showToast("The venue has been successfully deleted!")
  }
}
