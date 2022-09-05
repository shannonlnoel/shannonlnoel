import { Component,  Input} from '@angular/core';
import { ViewWillEnter} from '@ionic/angular';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
import { Vat } from 'src/app/models/vat';
import { VatService } from 'src/app/services/vat/vat.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-add-vat',
  templateUrl: './add-vat.component.html',
  styleUrls: ['./add-vat.component.scss'],
})
export class AddVatComponent implements ViewWillEnter{

  @Input() VAT: Vat;

  //Creating the form to add the new vat details, that will be displayed in the HTML component
  cVATForm: UntypedFormGroup = this.formBuilder.group({
    percentage: ['', [Validators.required, Validators.min(1), Validators.max(99)]]
  });


  constructor(public global: GlobalService, public formBuilder: UntypedFormBuilder,
    public vatService: VatService) { }

    //Used for validation within the form, if there are errors in the control, this method will return the errors.
  get errorControl() {
    return this.cVATForm.controls;
  }

  ionViewWillEnter(): void {
    console.log("AddVat-ViewWillEnter");
    console.log(this.VAT);
    if (this.VAT !=null){
      this.cVATForm.controls.percentage.setValue(this.VAT.percentage);}
    }

    submitForm() {
      if (!this.cVATForm.valid){
        console.log('Please provide all required fields');
        return false;
      }else{
        var temp = {
          percentage: this.cVATForm.value['percentage'],
          date: new Date().toISOString()       
        }; 
        this.vatService.confirmVatModal(temp);
        this.global.dismissModal();
      }
     }
}
