import { Component, Input, OnInit } from '@angular/core';
import { Schedule } from 'src/app/models/schedule';
import { GlobalService } from 'src/app/services/global/global.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-delete-schedule',
  templateUrl: './delete-schedule.component.html',
  styleUrls: ['./delete-schedule.component.scss'],
  providers: [DatePipe]
})
export class DeleteScheduleComponent implements OnInit {
  @Input() schedule: Schedule;
  constructor(public scheduleService: ScheduleService, public global: GlobalService) { }

  ngOnInit() {
    console.log("Delete schedule view:");
    console.log(this.schedule);
  }

  delete() {
    this.scheduleService.deleteScheduleEvent(this.schedule.scheduleID);
    this.global.dismissModal();
    this.global.showToast("The Schedule Event has been successfully deleted");
  }

}
