import { Component, Input, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { SaleItem } from 'src/app/models/sale-item';
import { WriteOff } from 'src/app/models/write-off';
import { GlobalService } from 'src/app/services/global/global.service';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { SalesService } from 'src/app/services/sales/sales.service';

@Component({
  selector: 'app-confirm-write-off-sitem',
  templateUrl: './confirm-write-off-sitem.component.html',
  styleUrls: ['./confirm-write-off-sitem.component.scss'],
})
export class ConfirmWriteOffComponent implements ViewWillEnter{
  @Input() writeOff: WriteOff;
  @Input() saleItem: SaleItem;
  @Input() empName: string;
  @Input() reason: string;


  constructor(public global: GlobalService, public writeOffService: InventoryService, public saleService: SalesService) {
  }

  ionViewWillEnter(): void {
    console.log("Passed through",this.writeOff)
    console.log("Passed through",this.saleItem)
    console.log("Passed through",this.empName)
    console.log("Passed through",this.reason)
  }

  //1 = confirm ADD
  async confirmChanges(writeOff: WriteOff){
    //search duplicates
    console.log('Add Sale Category from confirm:');
    //CallRepoToCreate
    this.writeOffService.createWriteOff(writeOff);
    this.global.dismissModal();
    this.global.showToast('The write-off has been successfully added!');
    this.saleService.fetchSaleItemsEvent.emit();
  }

  async returnFrom(){
    console.log(this.writeOff);
    this.global.dismissModal();
    this.writeOffService.addWriteOffInfoModal(this.saleItem);
  }
}
