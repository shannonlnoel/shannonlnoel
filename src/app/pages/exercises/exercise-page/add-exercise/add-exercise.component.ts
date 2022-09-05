import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ViewWillEnter} from '@ionic/angular';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ExerciseCategory } from 'src/app/models/exercise-category';
import { Exercise } from 'src/app/models/exercise';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss'],
})
export class AddExerciseComponent implements OnInit {

  @Input() exercise: Exercise;
  exerciseCategoryDropDown!: ExerciseCategory[];

  embed! : any;
  showVideo = false;

  cExerciseForm: UntypedFormGroup = this.formBuilder.group({
    exerciseName : ['', [Validators.required]],
    exerciseFocus : ['', [Validators.required]],
    exerciseUrl : ['', Validators.pattern(/(http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?)|(^$)/)],
    exerciseCategory : ['', [Validators.required]],
  });

  constructor(public global: GlobalService, public formBuilder: UntypedFormBuilder,
    public exerciseService: ExerciseService, private modalCtrl: ModalController, public sanitizer: DomSanitizer) { }

  get errorControl() {
    return this.cExerciseForm.controls;
  }

  ngOnInit() {

    this.exerciseService.getAllExerciseCategorys().subscribe(
      {
        next: data => {
          this.exerciseCategoryDropDown = data.result;
          console.log(data.result);
        }
      }

    );
    
  }

  getEmbed(exe : any) {
    const e = this.global.YoutubeToEmbed(exe.url)
    return this.sanitizer.bypassSecurityTrustResourceUrl(e);
  }

  embedImage() {

    this.showVideo = false;
    const url = this.cExerciseForm.get('exerciseUrl').value;

    if (url.length == 0) {
      this.showVideo = false;
      return;
    }

    if (!new RegExp(/(http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?)|(^$)/).test(url))
      return;
    const e = this.global.YoutubeToEmbed(url)
    this.embed = this.sanitizer.bypassSecurityTrustResourceUrl(e);
    this.showVideo = true;
  }

  submitForm() {

    if (!this.cExerciseForm.valid)
      return;

    const exercise = new Exercise();
    exercise.name = this.cExerciseForm.value['exerciseName'];
    exercise.focus = this.cExerciseForm.value['exerciseFocus'];
    exercise.url = this.cExerciseForm.value['exerciseUrl'];
    exercise.ExerciseCategoryID = this.cExerciseForm.value['exerciseCategory'];
    
    this.exerciseService.confirmExerciseModal(1, exercise).then(() => {
      this.modalCtrl.dismiss();
    });

  }

}
