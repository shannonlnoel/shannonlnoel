import { formatDate } from '@angular/common';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { BookingType } from 'src/app/models/booking-type';
import { Employee } from 'src/app/models/employee';
import { Schedule } from 'src/app/models/schedule';
import { Venue } from 'src/app/models/venue';
import { AddScheduleComponent } from 'src/app/pages/booking/schedule/add-schedule/add-schedule.component';
import { ConfirmScheduleComponent } from 'src/app/pages/booking/schedule/confirm-schedule/confirm-schedule.component';
import { DeleteScheduleComponent } from 'src/app/pages/booking/schedule/delete-schedule/delete-schedule.component';
import { UpdateScheduleComponent } from 'src/app/pages/booking/schedule/update-schedule/update-schedule.component';
import { AddBookingComponent } from 'src/app/pages/class-booking/add-booking/add-booking.component';
import { BookingService } from '../booking/booking.service';
import { EmployeeService } from '../employee/employee.service';
import { LessonService } from '../lesson/lesson.service';
import { RepoService } from '../repo.service';
import { VenueService } from '../venue/venue.service';

@Injectable({
  providedIn: 'root'
})

export class ScheduleService {
  @Output() fetchScheduleEvent = new EventEmitter<Schedule>();

  constructor(public repo: RepoService, public venueService: VenueService, public bookingService: BookingService, public lessonService: LessonService,
     public employeeService: EmployeeService, public modalCtrl: ModalController, public alertCtrl: AlertController ) { }

  //READS:
  getAllScheduleEvents() : Observable<any> {
    return this.repo.getScheduleEvent();
  }

  //Create:
  createSchedule(schedule: any){
    console.log("Creating schedule in Schedule Service:");
    console.log(schedule);
    this.repo.createScheduleEvent(schedule).subscribe(
      {
        next: () => {
          console.log('SCHEDULE EVENT CREATED');
          this.fetchScheduleEvent.emit();
        }
      }
    );
   }

    //Update:
    async updateSchedule(schedule: any) {
      return this.repo.updateScheduleEvent(schedule.scheduleID,schedule).subscribe(
        {
         next: () => {
           console.log('SCHEDULE EVENT UPDATED');
           this.fetchScheduleEvent.emit();
         },
         error: (err) => {
           console.log('SCHEDULE EVENT UPDATED FAILED');
           console.log(err);
         }
        }
      );
    }


  //Delete:
   deleteScheduleEvent(id: number){
    console.log('HERE = ' + id);
   this.repo.deleteScheduleEvent(id).subscribe(
     {
       next: res => {
         console.log(res);
         console.log('SCHEDULE EVENT DELETED');
         this.fetchScheduleEvent.emit();
       },
       error: err => {
         console.log('ÉRROR HERE');
         console.log(err);
       }
     }
   );
  }


  //CREATE Schedule event
  async addScheduleModal() {
    const modal = await this.modalCtrl.create({
      component: AddScheduleComponent,
      cssClass: 'calendar-modal',
      backdropDismiss: true
    });

    await modal.present();
  }

    //UPDATE Schedule event
    async updateScheduleModal(schedule: Schedule) {
      console.log(schedule);
      const modal = await this.modalCtrl.create({
        component: UpdateScheduleComponent,
        cssClass: 'calendar-modal',
        componentProps: {
          schedule
        },
        backdropDismiss: true
      });

      await modal.present();
    }

    //DELETE Schedule event
    async deleteScheduleModal(schedule: any) {
      console.log(schedule);
      const modal = await this.modalCtrl.create({
        component: DeleteScheduleComponent,
        cssClass: 'calendar-modal',
        componentProps: {
          schedule
        },
        backdropDismiss: true
      });

      await modal.present();
    }

  //Display the confirm create/update modal
  //Receives the selected qualificationtype from the qualificationtype page
  async confirmScheduleModal(choice: number, scheduleEvent: any, venueName: string, bookingTypeName: string, employeeName: string, lessonName: string) {

    console.log('ScheduleService: ConfirmScheduleModalCall');
    console.log(choice);
    console.log(scheduleEvent);

    if (choice === 1) {
      console.log('Performing ADD');
    } else if (choice === 2){
      console.log('Performing UPDATE');
    } else {
      console.log('Bad Option: ' + choice);
    }

      const modal = await this.modalCtrl.create({
        component: ConfirmScheduleComponent,
        componentProps: {
          scheduleEvent,
          choice,
          venueName,
          bookingTypeName,
          employeeName,
          lessonName
        }

      });
      await modal.present();
  }

  async addBookingModal(scheduleEvent: any){
    console.log("call modal addBooking", scheduleEvent);
    const modal = await this.modalCtrl.create({
      component: AddBookingComponent,
      componentProps: {
        scheduleEvent
      },
      backdropDismiss: true
    });

    await modal.present();
  }

  // async cancelBookingModal(scheduleEvent: any){
  //   const modal = await this.modalCtrl.create({
  //     component: CancelBookingComponent,
  //     componentProps: {
  //       scheduleEvent
  //     },
  //     backdropDismiss: true
  //   });

  //   await modal.present();
  // }


}
