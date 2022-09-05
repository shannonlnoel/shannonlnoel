import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { BookingType } from 'src/app/models/booking-type';
import { Employee } from 'src/app/models/employee';
import { Schedule } from 'src/app/models/schedule';
import { Venue } from 'src/app/models/venue';
import { GlobalService } from 'src/app/services/global/global.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { Time } from '@angular/common';
import { Lesson } from 'src/app/models/lesson';

@Component({
  selector: 'app-update-schedule',
  templateUrl: './update-schedule.component.html',
  styleUrls: ['./update-schedule.component.scss'],
})

export class UpdateScheduleComponent implements ViewWillEnter {

  @Input() schedule: any; // Not of type Schedule, type Event added to the calendar

  uCalendarForm: UntypedFormGroup = this.formBuilder.group({
    dateSelector: [, [Validators.required]],
    timeStartSelector: [, [Validators.required]],
    timeEndSelector: [,[Validators.required]],
    schedulePrice: [, [Validators.required, Validators.min(1)]],
    venueDrop : ['', [Validators.required]],
    bookingTypeDrop : ['', [Validators.required]],
    employeeDrop : ['', [Validators.required]],
    lessonDrop: ['',[Validators.required]]
  });

  //Dropdowns
  venueList!: Venue[];
  bookingTypeList!: BookingType[];
  employeeList!: Employee[];
  lessonList!: Lesson[];

  //Variable used to determine selection from user when adding a new event
  dateSelect: any;
  today: string = (new Date()).toISOString();
  timeStart: Time;
  timeEnd: Time;

  //Display old times before update
  sDate: Date = null;
  sTime: Time = null;
  eTime: Time = null;

  constructor(public formBuilder: UntypedFormBuilder, public scheduleService: ScheduleService, public modalCtrl:ModalController, public global: GlobalService) {
  this.fetchData();
  }

  ionViewWillEnter(): void {
    this.fetchData();
    this.setForm();
  }
  get errorControl() {
    return this.uCalendarForm.controls;
  }

  setForm(){
    this.sDate = this.schedule.startTime;
    this.sTime = this.schedule.startTime;
    this.eTime = this.schedule.endTime;

    this.uCalendarForm.get('schedulePrice').setValue(this.schedule.bookingPriceHistory[this.schedule.bookingPriceHistory.length-1].amount);
    const venueID = this.schedule.venue.venueID;
    const venueName = this.schedule.venue.name;
    this.uCalendarForm.get('venueDrop').setValue(`${venueID},${venueName}`);
    const bookingTypeID = this.schedule.bookingType.bookingTypeID;
    const bookingTypeName = this.schedule.bookingType.name;
    this.uCalendarForm.get('bookingTypeDrop').setValue(`${bookingTypeID},${bookingTypeName}`);
    const employeeID = this.schedule.employee.employeeID;
    const employeeName = this.schedule.employee.appUser.firstName;
    this.uCalendarForm.get('employeeDrop').setValue(`${employeeID},${employeeName}`);
    const lessonID = this.schedule.lesson.lessonID;
    const lessonName = this.schedule.lesson.name;
    this.uCalendarForm.get('lessonDrop').setValue(`${lessonID},${lessonName}`);
  }

   fetchData(){
     this.scheduleService.venueService.getAllVenues().subscribe({
      next: (data) => {
        this.venueList = data.result;
        console.log("Venues:");
        console.log(data);
      }
    });

    this.scheduleService.bookingService.getAllBookingTypes().subscribe({
      next: (data) => {
        this.bookingTypeList = data.result;
        console.log("Booking Types:");
        console.log(this.bookingTypeList);
      }
    });

    this.scheduleService.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employeeList = data;
        console.log("Employees:");
        console.log(data);
      }
    });

    this.scheduleService.lessonService.getAllLessons().subscribe({
      next: (data) => {
        console.log("Lessons: ")
        console.log(data);
        this.lessonList = data;
      },
    })
    //this.setForm();
  }

  ngOnInit() {
    this.fetchData();
  }

  submitForm() {
      var dateVal = this.uCalendarForm.value['dateSelector'];
      var dateSend: Date = null;
      var timeSVal = this.uCalendarForm.value['timeStartSelector'];
      var timeSSend: Date = null;
      var timeEVal = this.uCalendarForm.value['timeEndSelector'];
      var timeESend: Date = null;

    if (dateVal == undefined){
      console.log("no Date Defined, use old one");
      dateSend =  new Date(this.schedule.startTime);
    } else {
      dateSend = new Date(dateVal);
    }

    if (timeSVal == undefined){
      console.log("no timeS Defined, use old one");
      timeSSend = new Date(this.schedule.startTime);
    } else {
      timeSSend = new Date(timeSVal);
    }

    if (timeEVal == undefined){
      console.log("no timeE Defined, use old one");
      timeESend = new Date(this.schedule.endTime);
    } else {
      timeESend = new Date(timeEVal);
    }

      //var datePipe = new DatePipe('en');


      //var date = datePipe.transform(dateTemp,'dd/MM/yyyy');//formatted for display

      // timeSSend.setDate(dateTemp.getDate());
      // timeE.setDate(dateTemp.getDate());
      // timeS.setMonth(dateTemp.getMonth());
      // timeE.setMonth(dateTemp.getMonth());
      // timeS.setFullYear(dateTemp.getFullYear());
      // timeE.setFullYear(dateTemp.getFullYear());
      var bphTemp: any = [{
        amount: Number(this.uCalendarForm.controls['schedulePrice'].value)
      }];
      console.log(Number(this.uCalendarForm.controls['schedulePrice'].value));
      console.log(bphTemp[0].amount);
      console.log(this.schedule.bookingPriceHistory[this.schedule.bookingPriceHistory.length-1].amount);
      if (bphTemp[0].amount === this.schedule.bookingPriceHistory[this.schedule.bookingPriceHistory.length-1].amount){
        console.log(this.schedule.bookingPriceHistory[this.schedule.bookingPriceHistory.length-1].amount);
        this.global.showAlert("No price change on schedule update");
        console.log("setting price to null so it doesn't make a new price history record");
        bphTemp = null;
      }

      var temp: Schedule = {
        startDateTime:timeSSend,
        endDateTime: timeESend,
        bookingAttendance: null,
        bookingPriceHistory: bphTemp,
        venueID:this.uCalendarForm.value['venueDrop'].split(',')[0],
        bookingTypeID:this.uCalendarForm.value['bookingTypeDrop'].split(',')[0],
        employeeID:this.uCalendarForm.value['employeeDrop'].split(',')[0],
        lessonID: this.uCalendarForm.value['lessonDrop'].split(',')[0]
      };
      console.log(temp);
      this.global.dismissModal();
      this.scheduleService.confirmScheduleModal(1,temp,
      this.uCalendarForm.value['venueDrop'].split(',')[1],
      this.uCalendarForm.value['bookingTypeDrop'].split(',')[1],
      this.uCalendarForm.value['employeeDrop'].split(',')[1],
      this.uCalendarForm.value['lessonDrop'].split(',')[1]);
   }

   dateSelected(){
    this.sDate = this.dateSelect;
   }

  startSelected(){
    this.sTime = this.timeStart;
  }
   endSelected(){
    this.eTime = this.timeEnd;
   }
}
