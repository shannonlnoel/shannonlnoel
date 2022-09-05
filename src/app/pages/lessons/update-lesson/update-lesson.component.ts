import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { RepoService } from 'src/app/services/repo.service';
@Component({
  selector: 'app-update-lesson',
  templateUrl: './update-lesson.component.html',
  styleUrls: ['./update-lesson.component.scss'],
})
export class UpdateLessonComponent implements OnInit {

  @Input() lesson : any;

  //make a ViewChild in the TS
  //put the name of the # as the constructor for the ViewChild:
  @ViewChild('emp') trainerSelect : any; //trainerSelect is the variable name to refernce the html element with.

  //form for creation
  cLessonForm! : FormGroup;

  //employees
  employees : any[] = [];
  // @Input() employees : any;
  employeesLoadFlag = false;
  imgSrc = '';
  showImage = false;

  //categories
  // categories : any[] = [];
  @Input() categories : any[];
  categoriesLoadFlag = false;

  //to store the selected exercises
  id = 0;
  displaycount = 0;

  // exercises : any[] = [];
  @Input() exercises : any[];
  validExercises = false;

  constructor(private formBuilder : FormBuilder, private repo : RepoService, private modalCtrl : ModalController, private global : GlobalService, private lessonService : LessonService) { }

  //Must be in the ngAfterViewInit()
  ngAfterViewInit() {

    const ddName = `${this.lesson?.employee?.appUser.firstName} ${this.lesson?.employee?.appUser.lastName}`;
    //set the .selectedText to the value the user should see
    this.trainerSelect.selectedText = ddName;

    //if you want to set the actual value do it liek this:
    //you usually set the value in the form not with this method:
    //this.trainerSelect.value = 'id,name';

    //this is a different method using getElementById (not the easiest way);
    this.populateSelects();

  }

  populateSelects() {

    this.id = this.exercises.length;

    this.exercises.forEach((el : any) => {
      const tag : any = document.getElementById(`parent${el.id}`);
      tag.value = `${el.category.exerciseCategoryID},${el.category.name}`;
    });

    this.lesson.exercises.forEach((el : any, i : number) => {
      const tag : any = document.getElementById(`child${i}`);
      tag.value = `${el.exerciseID},${el.name}`;
    });


  }

  ngOnInit() {

    //console.log('update this lesson', this.lesson);
    //console.log('update lesson, exercises', this.exercises);
    console.log('update lesson, employee', this.employees);

    this.imgSrc = '';
    this.showImage = false;
    if (this.lesson.employee.photo != null || this.lesson.employee.photo != undefined || this.lesson.employee.photo != '') {
      this.imgSrc = this.createImg(this.lesson.employee.photo);
      this.showImage = true;
    }

    //make the form
    this.cLessonForm = this.formBuilder.group({
      lessonName: ['', Validators.required],
      lessonEmployee: ['', Validators.required],
      exercises : ['']
    });

    this.repo.getEmployees().subscribe({
      next: (data : any) => {
        this.employees = data.filter(el => el.role[0] == 'trainer');
        // //console.log('employees',employees)
      }
    });

    this.cLessonForm.valueChanges.subscribe(() => {
      this.validateForm();
    });

    const ddName = `${this.lesson.employee.appUser.firstName} ${this.lesson.employee.appUser.lastName}`;
    const t = `${this.lesson.employee.employeeID},${ddName}`;
    this.cLessonForm.get('lessonName').setValue(this.lesson.name);
    this.cLessonForm.get('lessonEmployee').setValue(t);

  }

  getFromCategory(exe : any) {
    //console.log('exe = ', exe);
    const ret = this.categories.filter(e => e.exerciseCategoryID == exe.category.exerciseCategoryID);
    //console.log('ret', ret);

    if (ret.length == 0)
      return null;
      
    return ret[0].exercises;
  }

  removeExerciseToForm(exercise : any) {
    this.exercises = this.exercises.filter(e => e.id !== exercise.id);
    this.updateDisplayCount();
    this.validateForm();
  }

  updateDisplayCount() {
    this.exercises.forEach((el : any, i : number) => {
      el.displaycount = i + 1;
    })
  }

  getEmpName(employee : any) {
    return `${employee.data.appUser.firstName} ${employee.data.appUser.lastName}`;
  }

  getEmpValue(employee : any) {
    return `${employee.data.employeeID}`;
  }

  submitForm() {

    //object form to pass to API:
    /*

      {
          "Lesson": {
              "lessonID": 0,
              "name": "Lesson 1 new name",
              "EmployeeID": 1
          },
          "Exercises" : [1]
      }

    */

    if (this.cLessonForm.invalid)
      return;

    //console.log(this.exercises);
    const formattedExercises = [];
    let q = 0;
    this.exercises.forEach((el : any) => {

      el.exercise.forEach((ex : any) => {
        if (ex.exerciseID == el.exercisePostID) {
          formattedExercises.push({
            i: ++q,
            ExerciseId: el.exercisePostID,
            ExerciseName : ex.name,
          });
        }
      });

  
    })
    const confirmData = {
      lessonID : this.lesson.lessonID,
      name: this.cLessonForm.value.lessonName,
      employee: this.cLessonForm.value.lessonEmployee,
      exercises: formattedExercises,
      imgSrc: this.imgSrc,
      showImage: this.showImage
    }

    this.lessonService.confirmLessonModal(2, confirmData).then(() => {
      this.modalCtrl.dismiss();
    });

  }

  checkEndLoad() {
    if (this.employeesLoadFlag && this.categoriesLoadFlag) {
      this.global.endNativeLoad();
    }
  }

  validateForm() { 
    this.validExercises = false;

    if (this.cLessonForm.invalid || this.exercises.length == 0)
      return;

    const test = this.exercises.filter(e => e.exercisePostID == -1);

    // //console.log('tst', test);
    if (test.length != 0)
      return;

    this.validExercises = true;
  }

  addExerciseToForm() {
    this.exercises.push(new exerciseObjs(this.id++));
    this.updateDisplayCount();
    this.validateForm();
  }

  setImage(emp : any) {
    this.showImage = false;
    const empID = emp.value.split(',')[0];
    const employee = this.employees.find(e => e.data.employeeID == empID);
    if (employee.data.photo != null) {
      this.showImage = true;
      this.imgSrc = this.createImg(employee.data.photo);
    }
    this.trainerSelect.selectedText = this.cLessonForm.get('lessonEmployee').value.split(',')[1];

  }

  createImg (src : string) {
    if (src == null || src == undefined || src == '') {
      return `https://testbsc.azurewebsites.net/Resources/Employees/Images/default.jpeg`;
    }
    return `https://testbsc.azurewebsites.net/Resources/Employees/Images/${src}`;
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  };

  get errorControl() {
    return this.cLessonForm.controls;
  }

  parentDropDownChange(exerciseObj : exerciseObjs, event : any) {
    //console.log(exerciseObj);
    const index = this.exercises.findIndex(e => e.id === exerciseObj.id);
    const catToSet = event.detail.value.split(',')[0];
    const exercisesIndex = this.categories.findIndex(e => e.exerciseCategoryID === parseInt(catToSet));
    //confirm category selection
    this.exercises[index].categoryset = true;
    this.exercises[index].category = this.categories[exercisesIndex];
    this.exercises[index].exercise = this.categories[exercisesIndex].exercises;
    
    const tag : any = document.getElementById(`child${exerciseObj.id}`);
    tag.value = ``;

    this.exercises[index].exercisePostID = -1;

    this.validateForm();
  }

  setExercisePostID(exercise : exerciseObjs, event : any) {
    //find exe obj:
    const index = this.exercises.findIndex(e => e.id === exercise.id);
    this.exercises[index].exercisePostID = parseInt(event.detail.value.split(',')[0]);
    this.validateForm();
  }

}

export class exerciseObjs {

  constructor(id : number) {
    this.id = id;
  }

  id : number;
  exercisePostID : number = -1;
  category : any;
  exercise : any;
  categoryset : boolean = true;

}