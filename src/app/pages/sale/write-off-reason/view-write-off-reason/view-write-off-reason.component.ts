import { Component, Input } from '@angular/core';
import { WriteOffReason } from 'src/app/models/write-off-reason'; 
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-write-off-reason',
  templateUrl: './view-write-off-reason.component.html',
  styleUrls: ['./view-write-off-reason.component.scss'],
})
export class ViewWriteOffReasonComponent {

  @Input() writeOffReason: WriteOffReason;

  constructor(public global: GlobalService) { }
}
