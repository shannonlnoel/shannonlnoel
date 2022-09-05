import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/services/booking/booking.service';
import { StoreService } from 'src/app/services/storage/store.service';

@Component({
  selector: 'app-event-bookings',
  templateUrl: './event-bookings.page.html',
  styleUrls: ['./event-bookings.page.scss'],
})
export class EventBookingsPage implements OnInit {

    //String used from the searchbar, used in the filter pipe to search venues.
    public filter: string;

    //Create local venue array to be populated onInit.
    myBookingList: any[] = [];

    //Subscription variable to track live updates.
    bookingSub: Subscription;

    isLoading = true;
    noresults = false;

  constructor(public bookingService: BookingService, public storage: StoreService) { }

  ngOnInit() {
    this.bookingService.fetchBookingEvent.subscribe({
      next: data => {
        console.log("Fetch booking event fired", data);
        this.fetchMyBookings();

      }
    })
    this.bookingService.fetchBookingEvent.emit();
  }

  async fetchMyBookings(){
    this.isLoading = true;
    var userID: string = '';
    await this.storage.getKey('user').then((usr : any) => {
      const obj = JSON.parse(usr)
      userID = `${obj.id}`.toString();
      })

    this.bookingService.getBookingByID(userID).subscribe({
      next: data => {
        console.log("Fetching client bookings");
        console.log(data.result);
        this.myBookingList = data.result;
        if (this.myBookingList == undefined){
          this.noresults = true;
          this.isLoading = false;
          return;
        } else {
          this.myBookingList = this.myBookingList.filter(x => x.bookingAttendance.length > 0);
          if (this.myBookingList.length < 1){
            this.noresults = true;
          }
          console.log(this.myBookingList);
          this.isLoading = false;
        }
      }
    })
  }

}
