/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ToastController, AlertController, ViewWillEnter } from '@ionic/angular';
import { Qualification } from 'src/app/models/qualification';
import { QualificationType } from 'src/app/models/qualification-type';
import { GlobalService } from 'src/app/services/global/global.service';
import { QualificationService } from 'src/app/services/qualification/qualification.service';
import { RepoService } from 'src/app/services/repo.service';

@Component({
  selector: 'app-add-qualification',
  templateUrl: './add-qualification.component.html',
  styleUrls: ['./add-qualification.component.scss'],
})
export class AddQualificationComponent implements ViewWillEnter {
  @Input() qualification: Qualification;
  qualificationTypeDropDown!: QualificationType[];

  cQualificationForm! : UntypedFormGroup;

  constructor(private toastCtrl: ToastController,
    public formBuilder: UntypedFormBuilder,
    public qualificationService: QualificationService,
    public global: GlobalService) { }

  get errorControl() {
    return this.cQualificationForm.controls;
  }

  ionViewWillEnter(): void {

    //populating the dropdown for saleCategory:
    this.qualificationService.getAllQualificationTypes().subscribe(
      {
        next: data => {
          this.qualificationTypeDropDown = data.result;
          console.log(data.result);
        }
      }
    );
    console.log('AddTitle-ViewWillEnter');
    console.log(this.qualification);
    if (this.qualification != null) {
      this.cQualificationForm.controls.description.setValue(this.qualification.description);
    }
  }

  submitForm() {
    if (!this.cQualificationForm.valid) {
      console.log('Please provide all required fields');
      return false;
    } else {
      const temp = {
        description: this.cQualificationForm.controls['description'].value,
        qualificationType: this.cQualificationForm.controls['qualificationType'].value.split(',')[0],
        employee: []
      };
      console.log(temp);
      this.qualificationService.confirmQualificationModal(1, temp, this.cQualificationForm.value['qualificationType'].split(',')[1]);
      this.global.dismissModal();
    }
  }

  async sucAdd() {
    const toast = await this.toastCtrl.create({
      message: 'The Qualification has been successfully added!',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  ngOnInit() {
    this.cQualificationForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      qualificationType: ['', [Validators.required]],
    });
  }

}
