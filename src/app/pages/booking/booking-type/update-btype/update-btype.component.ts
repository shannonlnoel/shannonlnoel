import { Component, Input } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewWillEnter } from '@ionic/angular';
import { BookingType } from 'src/app/models/booking-type';
import { BookingService } from 'src/app/services/booking/booking.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-update-btype',
  templateUrl: './update-btype.component.html',
  styleUrls: ['./update-btype.component.scss'],
})
export class UpdateBtypeComponent implements ViewWillEnter {

  @Input() bookingType: BookingType;

  uBookingTypeForm: FormGroup = this.formBuilder.group({
    bookingTypeName: ['', [Validators.required]],
    bookingTypeDescription: ['', [Validators.required]],
    bookingTypeCapacity: ['', [Validators.required, Validators.min(1)]],
    bookingTypeColour:  ['', [Validators.required]]
  });

  constructor(public global: GlobalService, public formBuilder: FormBuilder,
    public bookingService: BookingService) { }

  //Used for validation within the form, if there are errors in the control, this method will return the errors.
  get errorControl() {
    return this.uBookingTypeForm.controls;
  }

  ionViewWillEnter() {
    console.log('UpdateBookingType-ViewWillEnter');
    console.log(this.bookingType);
    if (this.bookingType == null){
      this.global.showAlert("Booking type not passed to update","ERROR");
      this.global.dismissModal();
    }  else {
      this.uBookingTypeForm.controls.bookingTypeName.setValue(this.bookingType.name);
      this.uBookingTypeForm.controls.bookingTypeDescription.setValue(this.bookingType.description);
      this.uBookingTypeForm.controls.bookingTypeCapacity.setValue(this.bookingType.capacity);
      this.uBookingTypeForm.controls.bookingTypeColour.setValue(this.bookingType.colour);
    }

  }

  submitForm() {
    if
    (!this.uBookingTypeForm.valid) { //If the form has any validation errors, the form will not be submitted.
      console.log('Please provide all required fields');
      return false;
    }
    else
    {
      console.log('InsideUpdateSubmit:');
      const choice = 2;
      // var priceChange;
      // if (this.uBookingTypeForm.value['bookingTypePrice'] == this.bookingType.bookingPriceHistory[0].amount){
      //   //No change of amount, send Null to api
      //   priceChange = null;
      // } else {
      //   priceChange = [{
      //     amount: this.uBookingTypeForm.value['bookingTypePrice']}];
      // }
      // console.log("Form price:");
      // console.log(this.uBookingTypeForm.value['bookingTypePrice']);
      // console.log("Old Price:");
      // console.log(this.bookingType.bookingPriceHistory[0].amount);
      // console.log("Price Change variable:");
      // console.log(priceChange);

      var temp: BookingType = {
        bookingTypeID: this.bookingType.bookingTypeID,
        name: this.uBookingTypeForm.value['bookingTypeName'],
        description: this.uBookingTypeForm.value['bookingTypeDescription'],
        capacity: this.uBookingTypeForm.value['bookingTypeCapacity'],
        colour: this.uBookingTypeForm.value['bookingTypeColour']
      };
       console.log(temp);
       this.bookingService.confirmBookingTypeModal(choice,temp);
       this.global.dismissModal();
    }
  }

}
