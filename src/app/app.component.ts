import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/authentication/auth.service';
import { GlobalService } from './services/global/global.service';
import { StoreService } from './services/storage/store.service';
import { VenueService } from './services/venue/venue.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  hide = false;

  constructor(private router : Router, venueService: VenueService, private auth : AuthService, private storage : StoreService, private global : GlobalService) {
    
  }
  
  
  ngOnInit() {

    this.auth.isLoggedIn.subscribe(log => {
      this.hide = log;
    })
    
  }


}
