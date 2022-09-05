import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { RepoService } from 'src/app/services/repo.service';
import { MeasurementsPage } from '../measurements.page';

@Component({
  selector: 'app-confirm-measurement',
  templateUrl: './confirm-measurement.component.html',
  styleUrls: ['./confirm-measurement.component.scss'],
})
export class ConfirmMeasurementComponent implements OnInit {

  @Input() mvm : any;


  date! : any;
  constructor(private modalCtrl : ModalController, private repo : RepoService, private global : GlobalService) { }

  ngOnInit() {
    this.date = this.mvm.measurement.Date;
    console.log(this.mvm);
  }

  confirmMeasurement() {
    
    const d = new Date(this.mvm.measurement.Date);
    const unix = Math.trunc(d.getTime() / 1000);

    this.mvm.measurement.Date = unix;
    this.global.nativeLoad("Loading...");
    this.repo.addMeasurement(this.mvm).subscribe({
      next: () => {
        this.modalCtrl.dismiss();
        this.global.closeMeasurementAddModal.next(true);
        this.global.fetchMeasurementFlag = true;
        this.global.showToast("Measurement added successfully.");
      },
      error: () => {
        this.global.showAlert('Error', 'Something went wrong. Please try again.');
      }
    }).add(() => { this.global.endNativeLoad(); });
      

  }
  
  returnFrom() {
    this.modalCtrl.dismiss();
    this.global.closeMeasurementAddModal.next(false);
  }

}
