import { Component, Input, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking/booking.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { StoreService } from 'src/app/services/storage/store.service';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.scss'],
})
export class CancelBookingComponent {

  @Input() booking: any;
  @Input() bookingAttendance: any;

  constructor(public global: GlobalService, public bookingService: BookingService, public storage: StoreService) { }

  async delete(){
    var userID: string = '';
    await this.storage.getKey('user').then((usr : any) => {
      const obj = JSON.parse(usr)
      userID = `${obj.id}`.toString();
      })

    this.bookingService.cancelClientBooking(userID,this.booking.bookingID,this.bookingAttendance.scheduleID).subscribe({
      next: data => {
        console.log(data);
        this.global.dismissModal();
        this.bookingService.fetchBookingEvent.emit();
        this.global.showToast("Booking event successfully canceled");
      }
    })
  }

}
