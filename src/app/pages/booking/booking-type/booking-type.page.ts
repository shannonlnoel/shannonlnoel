import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookingType } from 'src/app/models/booking-type';
import { BookingService } from 'src/app/services/booking/booking.service';

@Component({
  selector: 'app-booking-type',
  templateUrl: './booking-type.page.html',
  styleUrls: ['./booking-type.page.scss'],
})
export class BookingTypePage implements OnInit {

    //String used from the searchbar, used in the filter pipe to search exercise category.
    public filter: string;

    //Create local exercise category array to be populated onInit.
    bookingTypeList: BookingType[] = [];

    //Subscription variable to track live updates.
    bookingType: Subscription;

    isLoading = true;

  constructor(public bookingService: BookingService) {
    this.fetchBookingType();
   }

  fetchBookingType() {
    this.isLoading = true;
    this.bookingService.getAllBookingTypes().subscribe(
      {
        next: data => {
          console.log('Fetching booking types from DB');
          console.log(data);
          this.isLoading = false;
          this.bookingTypeList = data.result;
        }
      }
    );
  }

  ngOnInit() {
    this.bookingService.fetchBookingTypeEvent.subscribe({
      next: res => {
        console.log('Fetch booking type again');
        this.fetchBookingType();
      }
    })
  }

}
