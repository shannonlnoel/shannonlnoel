import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { ModalController} from '@ionic/angular';
import { Exercise } from 'src/app/models/exercise';
import { ExerciseCategory } from 'src/app/models/exercise-category';
import { GlobalService } from 'src/app/services/global/global.service';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-update-exercise',
  templateUrl: './update-exercise.component.html',
  styleUrls: ['./update-exercise.component.scss'],
})
export class UpdateExerciseComponent implements OnInit {

  @Input() exercise: Exercise;

  exerciseCategoryDropDown!: ExerciseCategory[];

  showVideo = false;
  embed! : any;

  uExerciseForm: UntypedFormGroup = this.formBuilder.group({
    exerciseName : ['', [Validators.required]],
    exerciseFocus : ['', [Validators.required]],
    exerciseUrl : ['', Validators.pattern(/(http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?)|(^$)/)],
    exerciseCategory : ['', [Validators.required]]
  });

  get errorControl() {
    return this.uExerciseForm.controls;
  }

  constructor(private modalCtrl: ModalController, public global: GlobalService, public formBuilder: UntypedFormBuilder,
    public exerciseService: ExerciseService, public sanitizer: DomSanitizer) { }

    ngOnInit() {

      console.log('exe to update', this.exercise);

      this.exerciseService.getAllExerciseCategorys().subscribe(
        {
          next: data => {
            this.exerciseCategoryDropDown = data.result;
            this.setForm();
            // console.log(data.result);
          }
        }
      );

      this.showVideo = RegExp(/(http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?)|(^$)/).test(this.exercise.url);
        if (this.showVideo) {
          this.embedImage();
        }
    }

    embedImage() {
      this.showVideo = false;
      const url = this.uExerciseForm.get('exerciseUrl').value;
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

    setForm() {
      const id = this.exercise.exerciseCategory.exerciseCategoryID;
      const name = this.exercise.exerciseCategory.name;
      this.uExerciseForm.get('exerciseCategory').setValue(`${id},${name}`);
      this.uExerciseForm.get('exerciseName').setValue(this.exercise.name);
      this.uExerciseForm.get('exerciseFocus').setValue(this.exercise.focus);
      this.uExerciseForm.get('exerciseUrl').setValue(this.exercise.url);
    }

    submitForm() {

      if (!this.uExerciseForm.valid)
        return;

      console.log('InsideUpdateSubmit:');

      const exercise = new Exercise();
      exercise.name = this.uExerciseForm.value['exerciseName'];
      exercise.focus = this.uExerciseForm.value['exerciseFocus'];
      exercise.url = this.uExerciseForm.value['exerciseUrl'];
      exercise.ExerciseCategoryID = this.uExerciseForm.value['exerciseCategory'];
      exercise.exerciseID = this.exercise.exerciseID;

      // this.global.dismissModal();
      this.exerciseService.confirmExerciseModal(2, exercise).then(() => {
        this.dismissModal();
      })

    }

    dismissModal() {
      this.modalCtrl.dismiss();
    }


}
