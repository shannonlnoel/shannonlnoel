import { Component, Input, OnInit } from '@angular/core';
import { RefundReason } from 'src/app/models/refund-reason';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-associative-refund-reason',
  templateUrl: './associative-refund-reason.component.html',
  styleUrls: ['./associative-refund-reason.component.scss'],
})
export class AssociativeRefundReasonComponent implements OnInit {

  @Input() refundReason: RefundReason;
  constructor(public global: GlobalService) { }

  ngOnInit() {}

}
