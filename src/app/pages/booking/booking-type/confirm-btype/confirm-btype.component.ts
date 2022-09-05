import { Component, Input } from '@angular/core';
import { BookingType } from 'src/app/models/booking-type';
import { BookingService } from 'src/app/services/booking/booking.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-confirm-btype',
  templateUrl: './confirm-btype.component.html',
  styleUrls: ['./confirm-btype.component.scss'],
})
export class ConfirmBtypeComponent {

  @Input() choice: number;
  @Input() bookingType: BookingType;
  constructor(public global: GlobalService, public bookingService: BookingService) { }

  async checkMatch(name:string, description:string): Promise<boolean>{
    return this.bookingService.matchingBookingType(name,description).then(data => {
      console.log("Check match result:");
      console.log(data);
       if (data != 0){
        let match = data.result;
        if (match.length > 1){
          this.global.showAlert("The booking type information entered already exists on the system","Booking Type Already Exists");
          this.global.dismissModal();
          return true;
        } else if (match.length == 1 && this.choice == 2 && match[0].bookingTypeID == this.bookingType.bookingTypeID){
          this.global.dismissModal();
          return false;
        } else {
          console.log("Must be in ADD, with exactly 1 other match: ");
          console.log("Choice: " + this.choice);
          this.global.showAlert("The booking type information entered already exists on the system","Booking Type Already Exists");

          this.global.dismissModal();
          return true;
        }
       } else {
        this.global.dismissModal();
         return false;
       }
     });
   }

 //1 = confirm ADD
  //2 = confirm UPDATE

  async confirmChanges(){
    //search duplicates
    await this.checkMatch(this.bookingType.name,this.bookingType.description).then(result =>{
      console.log(result);
      if (result == true){
         return;
       } else {
          if (this.choice === 1){
            console.log('Add booking type from confirm:');
            console.log(this.bookingType);
            //CallRepoToCreate
            this.bookingService.createBookingType(this.bookingType);
            this.global.dismissModal();
            this.global.showToast('The booking type has been successfully added!');
        } else if (this.choice === 2){
            console.log('Update booking type from confirm:');
            //CallRepoToUpdate
            this.bookingService.updateBookingType(this.bookingType);
            console.log(this.bookingType);
            this.global.dismissModal();
            this.global.showToast('The booking type has been successfully updated!');
          }
        }
      }
    )
  }

  returnFrom(){
    //1 = return to ADD
    //2 = return to UPDATE
    if (this.choice === 1){
      console.log(this.bookingType);
      this.global.dismissModal();
      this.bookingService.addBookingTypeModal(this.bookingType);
    } else if (this.choice === 2){
      console.log(this.bookingType);
      this.global.dismissModal();
      this.bookingService.updateBookingTypeModal(this.bookingType);
    }
  }

}
