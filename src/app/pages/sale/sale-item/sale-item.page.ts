import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global/global.service';
import { RepoService } from 'src/app/services/repo.service';
import { SalesService } from 'src/app/services/sales/sales.service';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { ViewWillEnter } from '@ionic/angular';


@Component({
  selector: 'app-sale-item',
  templateUrl: './sale-item.page.html',
  styleUrls: ['./sale-item.page.scss'],
})
export class SaleItemPage implements ViewWillEnter {
//String used from the searchbar, used in the filter pipe to search titles.
public filter: string;

//Create local title array to be populated onInit.
saleItemList: any[] = [];
numTimesLeft = 4
items: any[] = [];

//Subscription variable to track live updates.
saleItemSub: Subscription;

isLoading = true;

constructor(public saleService: SalesService, public repo: RepoService, public global: GlobalService, public inventoryService: InventoryService) {
   this.fetchSaleItem();
   this.addMoreItems();
  }


fetchSaleItem() {
  this.isLoading = true;
  this.saleService.getAllSaleItems().subscribe(
    {
      next: data => {
        console.log('Fetching items from DB');
        console.log(data);
        this.isLoading = false;
        this.saleItemList = data.result;
      }
    }
  );
}

loadData(event) {
  setTimeout(() => {
    console.log('Done');
    this.addMoreItems();
    this.numTimesLeft -= 1;
    event.target.complete();
  }, 400);
} 

addMoreItems() {
  for (let i = 1; i < 12; i++) {
    this.items.push(i);
  }
} 

ionViewWillEnter(): void {
  this.saleService.fetchSaleItemsEvent.subscribe(
    {
      next: res => {
        console.log('Fetch sale items again');
        this.fetchSaleItem();
      }
    }
  );
}

}