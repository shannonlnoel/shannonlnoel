import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-indemnity',
  templateUrl: './confirm-indemnity.component.html',
  styleUrls: ['./confirm-indemnity.component.scss'],
})
export class ConfirmIndemnityComponent implements OnInit {

  @Input() indemnity : any;
  pdfSrc = '';

  constructor(private modalCtrl : ModalController) { }

  ngOnInit() {
    console.log(this.indemnity)
    let reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        console.log(this.pdfSrc);
      };
    reader.readAsArrayBuffer(this.indemnity.file);
  }

  uploadIndemnity() {
    console.log('uploading indemnity');
    
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  };

}
