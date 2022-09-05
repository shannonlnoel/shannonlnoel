import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Venue } from 'src/app/models/venue';
import { RepoService } from 'src/app/services/repo.service';
import { VenueService } from 'src/app/services/venue/venue.service';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.page.html',
  styleUrls: ['./venue.page.scss'],
})
export class VenuePage implements OnInit {
  //String used from the searchbar, used in the filter pipe to search venues.
  public filter: string;

  //Create local venue array to be populated onInit.
  venueList: Venue[] = [];

  //Subscription variable to track live updates.
  venueSub: Subscription;

  isLoading = true;


  constructor(public venueService: VenueService, public repo: RepoService) {
    this.fetchVenues();
   }

  ngOnInit() {
    this.venueService.fetchVenuesEvent.subscribe(
      {
        next: res => {
          console.log('EMIT TO GO FETCH THE TITLES AGAIN');
          this.fetchVenues();
        }
      }
    );
    this.venueService.fetchVenuesEvent.emit();
  }

  fetchVenues() {
    this.isLoading = true;
    this.venueService.getAllVenues().subscribe(
      {
        next: data => {
          console.log('FETCHING VENUES FROM DB');
          console.log(data.result);
          this.venueList = data.result;
          this.isLoading = false;
        }
      }
    );
  }
}
