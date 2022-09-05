/* eslint-disable no-var */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ViewWillEnter } from '@ionic/angular';
import { Venue } from 'src/app/models/venue';
import { VenueService } from 'src/app/services/venue/venue.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-add-venue',
  templateUrl: './add-venue.component.html',
  styleUrls: ['./add-venue.component.scss'],
})
export class AddVenueComponent implements ViewWillEnter {
  @Input() venue: Venue;

  //Creating the form to add the new venue details, that will be displayed in the HTML component
  cVenueForm: UntypedFormGroup = this.formBuilder.group({
    venueName: ['', [Validators.required]],
    location: ['', [Validators.required]],
    postalCode: ['', [Validators.required,Validators.pattern('[0-9]{4}')]],
    capacity: ['', [Validators.required, Validators.min(1)]]
  });

  constructor(public global: GlobalService,public formBuilder: UntypedFormBuilder,
    public venueService: VenueService ) { }

  //Used for validation within the form, if there are errors in the control, this method will return the errors.
  get errorControl() {
    return this.cVenueForm.controls;
  }

  ionViewWillEnter(): void {
    console.log("AddVenue-ViewWillEnter");
    console.log(this.venue);
    if (this.venue !=null){
      this.cVenueForm.controls.venueName.setValue(this.venue.name);
      this.cVenueForm.controls.location.setValue(this.venue.address);
      this.cVenueForm.controls.postalCode.setValue(this.venue.postalCode);
      this.cVenueForm.controls.capacity.setValue(this.venue.capacity);
    }

  }

  submitForm() {
    if (!this.cVenueForm.valid){
      console.log('Please provide all required fields');
      return false;
    }else{
      var temp = {
        name: this.cVenueForm.value['venueName'],
        address: this.cVenueForm.value['location'],
        postalCode: this.cVenueForm.value['postalCode'],
        capacity: this.cVenueForm.value['capacity'],
        schedules: null  
      };
      this.venueService.confirmVenueModal(1,temp);
      this.global.dismissModal();
    }
   }
}

