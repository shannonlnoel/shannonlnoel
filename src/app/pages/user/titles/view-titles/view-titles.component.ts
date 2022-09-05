import { Component, Input } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Title } from 'src/app/models/title';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-titles',
  templateUrl: './view-titles.component.html',
  styleUrls: ['./view-titles.component.scss'],
})
export class ViewTitlesComponent implements ViewWillEnter{
  @Input() title: Title;

  constructor(public global: GlobalService) { 
  }

  ionViewWillEnter() {
    console.log("viewSpecificTitle-ViewWillEnter");
    console.log(this.title);
  }

}
