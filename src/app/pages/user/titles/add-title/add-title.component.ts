/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
import { Component,  Input } from '@angular/core';
import { ViewWillEnter} from '@ionic/angular';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Title } from 'src/app/models/title';
import { TitleService } from 'src/app/services/title/title.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-add-title',
  templateUrl: './add-title.component.html',
  styleUrls: ['./add-title.component.scss'],
})

export class AddTitleComponent implements ViewWillEnter {

  @Input() title: Title;

   //Creating the form to add the new venue details, that will be displayed in the HTML component
   cTitleForm: UntypedFormGroup = this.formBuilder.group({
    titleDescription: ['', [Validators.required]]
  });


  constructor(public global: GlobalService, public formBuilder: UntypedFormBuilder,
    public titleService: TitleService ) { }

    //Used for validation within the form, if there are errors in the control, this method will return the errors.
  get errorControl() {
    return this.cTitleForm.controls;
  }

  ionViewWillEnter(): void {
    console.log("AddTitle-ViewWillEnter");
    console.log(this.title);
    if (this.title !=null){
      this.cTitleForm.controls.titleDescription.setValue(this.title.description);}
    }

    submitForm() {
      if (!this.cTitleForm.valid){
        console.log('Please provide all required fields');
        return false;
      }else{
        const temp = {
          description: this.cTitleForm.value['titleDescription'],
          users: null
        };
        this.titleService.confirmTitleModal(1,temp);
        this.global.dismissModal();
      }
     }
}
