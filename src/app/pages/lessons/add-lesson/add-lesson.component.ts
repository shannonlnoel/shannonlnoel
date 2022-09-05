import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { RepoService } from 'src/app/services/repo.service';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss'],
})



export class AddLessonComponent implements OnInit {

  //form for creation
  cLessonForm! : FormGroup;

  //employees
  employees : any[] = [];
  employeesLoadFlag = false;
  imgSrc = '';
  showImage = false;

  //categories
  categories : any[] = [];
  categoriesLoadFlag = false;

  //to store the selected exercises
  id = 0;
  displaycount = 0;
  exercises : any[] = [];
  validExercises = false;

  constructor(private formBuilder : FormBuilder, private repo : RepoService, private modalCtrl : ModalController, private global : GlobalService, private lessonService : LessonService) {}

  ngOnInit() {

    //make the form
    this.cLessonForm = this.formBuilder.group({
      lessonName: ['', Validators.required],
      lessonEmployee: ['', Validators.required],
      exercises : ['']
    });

    this.cLessonForm.valueChanges.subscribe(() => {
      this.validateForm();
    });

    this.global.nativeLoad("Loading...");

    //fetch employees for the dropdown:
    this.repo.getEmployees().subscribe({
      next: (data : any) => {
        console.log(data)
        this.employees = data.filter(el => el.role[0] == 'trainer');
        console.log('employees',this.employees)
      }
    }).add(() => { 
      this.employeesLoadFlag = true;
      this.checkEndLoad();
    });

    //fetch all exercise categories that have the exercises:
    this.repo.getExerciseCategory().subscribe({
      next: (data : any) => {
        //console.log('categories', data.result)
        this.categories = data.result.filter(e => e.exercises.length > 0);
      }
    }).add(() => { 
      this.categoriesLoadFlag = true;
      this.checkEndLoad();
    });

  }

  setExerciseDropDown(exerciseObj : exerciseObjs, event : any) {
    const index = this.exercises.findIndex(e => e.id === exerciseObj.id);
    const catToSet = event.detail.value.split(',')[0];
    const exercisesIndex = this.categories.findIndex(e => e.exerciseCategoryID === parseInt(catToSet));
    //confirm category selection
    this.exercises[index].categoryset = true;
    this.exercises[index].category = this.categories[exercisesIndex];
    this.exercises[index].exercise = this.categories[exercisesIndex].exercises;
    this.validateForm();
  }

  setExercisePostID(exercise : exerciseObjs, event : any) {
    //find exe obj:
    const index = this.exercises.findIndex(e => e.id === exercise.id);
    this.exercises[index].exercisePostID = parseInt(event.detail.value.split(',')[0]);
    this.validateForm();
  }
  
  loading() {
    return this.categoriesLoadFlag && this.employeesLoadFlag;
  }

  checkEndLoad() {
    if (this.employeesLoadFlag && this.categoriesLoadFlag) {
      this.global.endNativeLoad();
    }
  }

  addExerciseToForm() {
    this.exercises.push(new exerciseObjs(this.id++));
    this.updateDisplayCount();
    this.validateForm();
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

  validateForm() { 

    this.validExercises = false;

    if (this.cLessonForm.invalid || this.exercises.length == 0)
      return;

    const test = this.exercises.filter(e => e.exercisePostID == -1);

    //console.log('tst', test);
    if (test.length != 0)
      return;

    this.validExercises = true;
  }

  setImage(emp : any) {
    this.showImage = false;
    const empID = emp.value.split(',')[0];
    const employee = this.employees.find(e => e.data.employeeID == empID);
    if (employee.data.photo != null) {
      this.showImage = true;
      this.imgSrc = this.createImg(employee.data.photo);
    }
  }

  createImg (src : string) {
    return `https://testbsc.azurewebsites.net/Resources/Employees/Images/${src}`;
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
      name: this.cLessonForm.value.lessonName,
      employee: this.cLessonForm.value.lessonEmployee,
      exercises: formattedExercises,
      imgSrc: this.imgSrc,
      showImage: this.showImage
    }

    this.lessonService.confirmLessonModal(1, confirmData).then(() => {
      this.dismissModal();
    });
      
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  };

  getEmpName(employee : any) {
    return `${employee.data.appUser.firstName} ${employee.data.appUser.lastName}`;
  }

  getEmpValue(employee : any) {
    return `${employee.data.employeeID}`;
  }

  get errorControl() {
    return this.cLessonForm.controls;
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
  categoryset : boolean = false;

}