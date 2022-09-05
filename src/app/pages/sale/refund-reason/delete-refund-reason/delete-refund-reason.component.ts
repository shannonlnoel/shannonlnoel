import { Component, Input } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { RefundReason } from 'src/app/models/refund-reason';
import { GlobalService } from 'src/app/services/global/global.service';
import { SalesService } from 'src/app/services/sales/sales.service';

@Component({
  selector: 'app-delete-refund-reason',
  templateUrl: './delete-refund-reason.component.html',
  styleUrls: ['./delete-refund-reason.component.scss'],
})
export class DeleteRefundReasonComponent{
  @Input() refundReason: RefundReason;

  constructor(private global: GlobalService,
    public saleService: SalesService) { }

    //Send through the id of the selected refund reason to be deleted in the refund reason service.
    async delete(id: number){
    this.saleService.deleteRefundReason(id);
    this.global.dismissModal();
    this.global.showToast('The refund reason has been successfully deleted!');
    }
}
