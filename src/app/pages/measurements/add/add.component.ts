import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Measurement } from 'src/app/models/measurement';
import { GlobalService } from 'src/app/services/global/global.service';
import { StoreService } from 'src/app/services/storage/store.service';
import { ConfirmMeasurementComponent } from '../confirm-measurement/confirm-measurement.component';
import { MeasurementsPage } from '../measurements.page';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  measurementForm! : NgForm;
  email! : any;

  constructor(private storage : StoreService, private global : GlobalService, private modalCtrl : ModalController) { }

  ngOnInit() {
    this.storage.getKey('token').then((token) => {
      const decode = this.global.decodeToken(token);
      console.log(decode);
      this.email = decode.sub;
    }); 
  }

  async onMeasurementSubmit(form : NgForm) {

    console.log(form);
    console.log(form.controls.weight.value);
    const measurement : Measurement = new Measurement();
    measurement.ClientID = 0;
    measurement.BodyFate = form.controls.bodyFat.value;
    measurement.Waist = form.controls.waist.value;
    measurement.Height = form.controls.height.value;
    measurement.Weight = form.controls.weight.value;
    measurement.Date = form.controls.date.value;
    // measurement.Date = Math.trunc(new Date(form.controls.date.value).getTime() / 1000);

    const mvm = {
      email: this.email,
      measurement: measurement
    }
    console.log('mvm to pass', mvm)
    const modal = await this.modalCtrl.create({
      component: ConfirmMeasurementComponent,
      componentProps: {mvm}
    });
    await modal.present();
    
    this.global.closeMeasurementAddModal.subscribe((sub : any) => {
      console.log('closeMeasurementAddModal', sub);
      if (sub == true) {
        modal.onDidDismiss().then((data : any) => {
            this.dismissModal();
        });
        console.log('try dismiss')
      }
        
    })
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
