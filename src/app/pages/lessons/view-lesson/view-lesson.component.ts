import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-lesson',
  templateUrl: './view-lesson.component.html',
  styleUrls: ['./view-lesson.component.scss'],
})
export class ViewLessonComponent implements OnInit {

  @Input() lesson : any;
  imgSrc = '';
  showImage = false;

  constructor(private modalCtrl : ModalController) { }

  ngOnInit() {
    this.showImage = this.lesson.showImage;
    this.imgSrc = this.lesson.imgSrc;
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
