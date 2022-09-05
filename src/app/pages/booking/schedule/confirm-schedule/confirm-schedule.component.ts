import { DatePipe, Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Schedule } from 'src/app/models/schedule';
import { GlobalService } from 'src/app/services/global/global.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';

@Component({
  selector: 'app-confirm-schedule',
  templateUrl: './confirm-schedule.component.html',
  styleUrls: ['./confirm-schedule.component.scss'],
})
export class ConfirmScheduleComponent implements ViewWillEnter{

  @Input() choice: number;
  @Input() scheduleEvent: Schedule;
  @Input() venueName: string;
  @Input() bookingTypeName: string;
  @Input() employeeName: string;
  @Input() lessonName: string;

  dateString: string;
  timeStart: string;
  timeEnd: string;


  finalStart: string;
  finalEnd: string;
  finalPriceHistory: string;

  constructor(public global:GlobalService, public scheduleService: ScheduleService) { }

  ionViewWillEnter(): void {
    this.dateString = new Date(this.scheduleEvent.startDateTime).toDateString();
    this.timeStart = new Date(this.scheduleEvent.startDateTime).toLocaleTimeString();
    this.timeEnd = new Date(this.scheduleEvent.endDateTime).toLocaleTimeString();
    console.log(this.dateString);
    console.log(this.timeStart);
    console.log(this.timeEnd);
    //this.finalStart = new Date(this.scheduleEvent.dateSession.timeStart).toISOString();
    //this.finalEnd = new Date(this.scheduleEvent.dateSession.timeEnd).toISOString();
    this.finalStart = (new Date (
      this.scheduleEvent.startDateTime.getUTCFullYear(),
      this.scheduleEvent.startDateTime.getUTCMonth(),
      this.scheduleEvent.startDateTime.getUTCDate(),
      this.scheduleEvent.startDateTime.getUTCHours()+4,
      this.scheduleEvent.startDateTime.getUTCMinutes(),
    )).toISOString();
    this.finalEnd = (new Date (
      this.scheduleEvent.endDateTime.getUTCFullYear(),
      this.scheduleEvent.endDateTime.getUTCMonth(),
      this.scheduleEvent.endDateTime.getUTCDate(),
      this.scheduleEvent.endDateTime.getUTCHours()+4,
      this.scheduleEvent.endDateTime.getUTCMinutes(),
    )).toISOString();
    this.finalPriceHistory = (new Date (
      this.scheduleEvent.endDateTime.getUTCFullYear(),
      this.scheduleEvent.endDateTime.getUTCMonth(),
      this.scheduleEvent.endDateTime.getUTCDate(),
      this.scheduleEvent.endDateTime.getUTCHours()+4,
      this.scheduleEvent.endDateTime.getUTCMinutes(),
    )).toISOString();
    console.log(this.finalStart);
    console.log(this.finalEnd);
  }
    //1 = confirm ADD
  //2 = confirm UPDATE
  async confirmChanges(){
    var tempPrice: any = null;
    if (this.scheduleEvent.bookingPriceHistory != null){
      tempPrice = [{
        amount: this.scheduleEvent.bookingPriceHistory[0].amount
      }]
    }



    console.log(this.choice);
    var final: Schedule = {
      bookingAttendance : null, //set to null at first and created on API side
      bookingPriceHistory: tempPrice,
      venueID: this.scheduleEvent.venueID,
      bookingTypeID: this.scheduleEvent.bookingTypeID,
      lessonID: this.scheduleEvent.lessonID,
      employeeID: this.scheduleEvent.employeeID,
      startDateTime: this.finalStart,
      endDateTime: this.finalEnd
      }
            if (this.choice === 1){

              console.log('Add schedule Item from confirm:');
              console.log(this.scheduleEvent);
              //CallRepoToCreate
              this.scheduleService.createSchedule(final);
              this.global.dismissModal();
              this.global.showToast("The schedule event has been successfully added!");
            } else if (this.choice === 2){
              console.log('Update SCHEDULE EVENT - incomplete');
              //CallRepoToUpdate
              console.log(this.scheduleEvent);
              this.scheduleService.updateSchedule(final);
            this.global.dismissModal();
            this.global.showToast('The schedule event has been successfully updated!');
          }
  }

  async returnFrom(){
    //1 = return to ADD
    //2 = return to UPDATE
    if (this.choice === 1){
      this.global.dismissModal();
      this.scheduleService.addScheduleModal();
    } else if (this.choice === 2){
      this.global.dismissModal();
      this.scheduleService.updateScheduleModal(this.scheduleEvent);
    }
  }

}
