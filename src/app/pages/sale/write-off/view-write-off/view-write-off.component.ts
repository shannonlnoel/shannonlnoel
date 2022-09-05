import { Component, Input, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { WriteOff } from 'src/app/models/write-off';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-write-off',
  templateUrl: './view-write-off.component.html',
  styleUrls: ['./view-write-off.component.scss'],
})
export class ViewWriteOffComponent implements ViewWillEnter{


  @Input() writeOff: WriteOff;

  constructor(public global:GlobalService) { 
    
  }

  ionViewWillEnter(): void {
    console.log("In View pass: ",this.writeOff)
  }

  
}
