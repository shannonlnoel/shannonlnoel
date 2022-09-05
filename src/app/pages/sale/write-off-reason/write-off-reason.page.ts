import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WriteOffReason } from 'src/app/models/write-off-reason';
import { InventoryService } from 'src/app/services/inventory/inventory.service';

@Component({
  selector: 'app-write-off-reason',
  templateUrl: './write-off-reason.page.html',
  styleUrls: ['./write-off-reason.page.scss'],
})
export class WriteOffReasonPage implements OnInit {

  //String used from the searchbar, used in the filter pipe to search write-off reason.
  public filter: string;

  //Create local write-off reason array to be populated onInit.
  writeOffReasonList: WriteOffReason[] = [];

  //Subscription variable to track live updates.
  writeOffReason: Subscription;

  isLoading = true;

  constructor(public writeOffReasonService: InventoryService) {
    this.fetchWriteOffReason();
  }

  fetchWriteOffReason() {
    this.isLoading = true;
    this.writeOffReasonService.getAllWriteOffReasons().subscribe(
      {
        next: data => {
          console.log('Fetching write-off reasons from DB');
          console.log(data);
          this.isLoading = false;
          this.writeOffReasonList = data.result;
        }
      }
    );
  }

  ngOnInit() {
    this.writeOffReasonService.fetchWriteOffReasonsEvent.subscribe({
      next: res => {
        console.log('Fetch write-off reasons again');
        console.log(res);
        this.fetchWriteOffReason();
      }
    })
  }

}
