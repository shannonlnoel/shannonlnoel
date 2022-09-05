import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SaleItem } from 'src/app/models/sale-item';
import { WriteOff } from 'src/app/models/write-off';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { SalesService } from 'src/app/services/sales/sales.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-write-off',
  templateUrl: './write-off.page.html',
  styleUrls: ['./write-off.page.scss'],
})
export class WriteOffPage implements ViewWillEnter {

  //String used from the searchbar, used in the filter pipe to search write-off.
  public filter: string;

  //Create local write-off array to be populated onInit.
  writeOffList: WriteOff [] = [];
  tempList: WriteOff [] = []; //unfiltered

  //Create local saleItem array.
  saleItemList: SaleItem [] = [];
  //Subscription variable to track live updates.
  writeOff: Subscription;

  isLoading = true;

  constructor(public writeOffService: InventoryService, public global: GlobalService, public saleItemService: SalesService) {
    this.fetchWriteOff();
  }

  fetchWriteOff() {
    this.isLoading = true;
    this.writeOffService.getAllWriteOffs().subscribe(
      {
        next: data => {
          console.log('Fetching write-off from DB');
          console.log(data);
          this.isLoading = false;
          this.tempList = data.result;
          this.writeOffList = [];
          //this.writeOffList = data.result;
          console.log(this.writeOffList);
          this.tempList.forEach(writeOff => {
            console.log(writeOff);
            if (writeOff.writeOffLine.length > 0){
              this.writeOffList.push(writeOff);
            }
          })
        }
      }
    );
  }

  ionViewWillEnter(): void {
    this.writeOffService.fetchWriteOffsEvent.subscribe({
      next: res => {
        console.log('Fetch write-off again');
        console.log(res);
        this.fetchWriteOff();
      }
    })
    this.writeOffService.fetchWriteOffsEvent.emit();
  }

}
