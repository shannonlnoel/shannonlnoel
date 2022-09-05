import { AfterViewInit, Component,ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { Subscription } from 'rxjs';
import { Schedule } from 'src/app/models/schedule';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { AlertController, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { GlobalService } from 'src/app/services/global/global.service';
import { ITimeSelected } from 'ionic2-calendar/calendar';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements AfterViewInit  {
    //Calendar related:
    eventSource:any[] = []; //events to display
    viewTitle: string; //Title(i.e Month, or day)
    modalReady = false; //Delay calendar generation so API call finishes

    calendar = {
      mode: 'month',
      currentDate: new Date()
    }

    //Object to add to schedule on create + populate calendar (time realted information here but rest in schedule entity)
  event = {
    scheduleID: 0,
    venue:{},
    bookingType:{},
    lesson:{},
    employee:{},
    bookingPriceHistory:null,
    startDateTime: null,
    endDateTime: null,
    colour: null
  }

    //Create local schedule array to be populated onInit.
    scheduleList: Schedule[] = [];

    //Subscription variable to track live updates.
    scheduleSub: Subscription;

    isLoading = true;

    @ViewChild(CalendarComponent) scheduleCalendar: CalendarComponent;

  constructor(public scheduleService: ScheduleService, public alertCtrl: AlertController, public modalCtrl: ModalController, public global: GlobalService ) {
    this.fetchSchedule();
    console.log(this.scheduleList);

   }

   ngAfterViewInit(): void {
    this.scheduleService.fetchScheduleEvent.subscribe(
      {
        next: res => {
          console.log('Fetch schedule events again');
          this.fetchSchedule();
        }
      }
    );
   }

  fetchSchedule() {
    this.isLoading = true;
    this.scheduleService.getAllScheduleEvents().subscribe(
      {
        next: (data) => {
          console.log("Fetching Schedule Events from API");
          this.scheduleList = data.result;
          var events = [];
          if (this.scheduleList!= undefined){
            this.scheduleList.forEach((sItem) => {
              console.log(sItem);
              var date = new Date(sItem.startDateTime);
              var startTime: Date;
              startTime = new Date(
                Date.UTC(
                  date.getUTCFullYear(),
                  date.getUTCMonth(),
                  date.getUTCDate(),
                  date.getHours()-2,
                  date.getMinutes()
                ));
                console.log(startTime);

                var date = new Date(sItem.endDateTime);
                var endTime: Date;
                endTime = new Date(
                  Date.UTC(
                    date.getUTCFullYear(),
                    date.getUTCMonth(),
                    date.getUTCDate(),
                    date.getHours()-2,
                    date.getMinutes()
                  ));
                  console.log(endTime);

                events.push({
                  scheduleID: sItem.scheduleID,
                  venue: sItem.venue,
                  bookingType: sItem.bookingType,
                  startTime: startTime,
                  endTime: endTime,
                  lesson: sItem.lesson,
                  employee: sItem.employee,
                  bookingPriceHistory: sItem.bookingPriceHistory,
                  colour: sItem.bookingType.colour
                });
                document.body.style.setProperty('--colour'[sItem.scheduleID],sItem.bookingType.colour);
              })
              this.eventSource = events;
              console.log(this.eventSource);
              this.isLoading = false;
          } else {
            this.isLoading = false;
          }

        },
        error: (err)=>{
          console.log("Error fetching Schedule events from API");
          console.log(err);
          this.isLoading = true;
          this.global.showAlert("Unable to fetch events from the database","ERROR fetching events", ['Ok']).then(() => {this.isLoading = false;});
        }
      });

  }

   next() {
    this.scheduleCalendar.slideNext();
  }

  back() {
    this.scheduleCalendar.slidePrev();
  }

  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    console.log('ev: ', ev);
    this.global.showAlert("Time selected");
    //this.event.startTime = new Date(ev.selectedTime);
    //this.scheduleService.addScheduleModal();
  }

    //Modals:
  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    console.log(event);
    let start = formatDate(event.startTime, 'h:mm a', 'en-ZA');
    let end = formatDate(event.endTime, 'h:mm a', 'en-ZA');
    let date = formatDate(event.startTime,'EEEE, MMMM d','en-ZA');
    const alert = await this.alertCtrl.create({
      header: date,
      message: start +'&nbsp; - &nbsp;' + end +
      '<br><br>Venue:&emsp;' + event.venue.name +
      '<br><br>Booking Type:&emsp;' + event.bookingType.name +
      '<br><br>Lesson:&emsp;' + event.lesson.name +
      '<br><br>Price:&emsp; R' + event.bookingPriceHistory[event.bookingPriceHistory.length-1].amount +
      '<br><br>Employee:&emsp;' + event.employee.appUser.firstName + '&nbsp;' + event.employee.appUser.lastName
      ,
      buttons: ['Ok',{
        text: 'Update',
        handler: () =>{this.updateEvent(event);}
      },
      {
        text: 'Delete',
        cssClass: 'redDelete',
        handler: () => {this.deleteEvent(event);}
      }],
    });
    alert.present();
  }

  updateEvent(event: Schedule){
    console.log("Updating event: " + event.scheduleID);
    this.scheduleService.updateScheduleModal(event);
  }

  deleteEvent(event: any){
    console.log("Deleting event: " + event);
    this.scheduleService.deleteScheduleModal(event);
  }
}
