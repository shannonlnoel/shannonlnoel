import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RefundReason } from 'src/app/models/refund-reason';
import { RepoService } from 'src/app/services/repo.service';
import { SalesService } from 'src/app/services/sales/sales.service';

@Component({
  selector: 'app-refund-reason',
  templateUrl: './refund-reason.page.html',
  styleUrls: ['./refund-reason.page.scss'],
})
export class RefundReasonPage implements OnInit {

  //String used from the searchbar, used in the filter pipe to search titles.
  public filter: string;

  //Create local title array to be populated onInit.
  refundReasonList: RefundReason[] = [];

  //Subscription variable to track live updates.
  refundReasonSub: Subscription;

  isLoading = true;
  constructor(public saleService: SalesService, public repo: RepoService) {
     this.fetchRefundReason();
  }

  fetchRefundReason() {
    this.isLoading = true;
    this.saleService.getAllRefundReasons().subscribe(
      {
        next: data => {
          console.log('Fetching reasons from DB');
          console.log(data);
          this.isLoading = false;
          this.refundReasonList = data.result;
        }
      }
    );
  }


  ngOnInit() {
    this.saleService.fetchRefundReasonsEvent.subscribe(
      {
        next: res => {
          console.log('Fetch refund reasons again');
          this.fetchRefundReason();
        }
      }
    );

  }

}

