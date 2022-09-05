import { Component, Input } from '@angular/core';
import { RefundReason } from 'src/app/models/refund-reason';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-refund-reason',
  templateUrl: './view-refund-reason.component.html',
  styleUrls: ['./view-refund-reason.component.scss'],
})
export class ViewRefundReasonComponent{
  @Input() refundReason: RefundReason;

  constructor(private global: GlobalService) { }

}
