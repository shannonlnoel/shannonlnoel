import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { Exercise } from 'src/app/models/exercise';
import { ExerciseCategory } from 'src/app/models/exercise-category';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-exercise',
  templateUrl: './view-exercise.component.html',
  styleUrls: ['./view-exercise.component.scss'],
})

export class ViewExerciseComponent implements OnInit {

  @Input() exercise: Exercise;

  emebed! : any;
  showVideo = false;

  constructor(private modalCtrl: ModalController, public global: GlobalService, public exerciseService: ExerciseService, public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.showVideo = RegExp(/(http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?)|(^$)/).test(this.exercise.url);
  }

  getEmbed(exe : any) {
    const e = this.global.YoutubeToEmbed(exe.url)
    return this.sanitizer.bypassSecurityTrustResourceUrl(e);
  }

  returnFrom() {
    this.modalCtrl.dismiss();
  }

}
