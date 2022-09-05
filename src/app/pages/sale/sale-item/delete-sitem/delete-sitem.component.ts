import { Component, Input } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { SalesService } from 'src/app/services/sales/sales.service';

@Component({
  selector: 'app-delete-sitem',
  templateUrl: './delete-sitem.component.html',
  styleUrls: ['./delete-sitem.component.scss'],
})
export class DeleteSitemComponent implements ViewWillEnter {

  @Input() saleItem: any;
  @Input() categoryName: string;
  @Input() image:any;

  currentCategory! : string;

  constructor(private global: GlobalService, 
    public saleService: SalesService, public inventoryService: InventoryService) { }
  
    ionViewWillEnter() {
      console.log('DeleteSaleItem - ViewWillEnter');
      console.log(this.saleItem);
      this.convertToName();
    }
  
    //Send through the id of the selected sale item to be deleted in the sale item service.
    async delete(id: number){
      this.saleService.deleteSaleItem(id);
      this.global.dismissModal();
      this.global.showToast("The sale item has been successfully deleted!");
      this.inventoryService.fetchWriteOffsEvent.emit();

    }

    public createImg = (fileName: string) => { 
      return `https://testbsc.azurewebsites.net/Resources/Images/saleItemImages/${fileName}`; 
    }

    convertToName() {
      this.saleService.getAllSaleCategories().subscribe(
        {
          next: data => {
            console.log(data.result)
            data.result.forEach(element => {
              console.log(this.saleItem.saleCategoryId);
              if (element.saleCategoryID == this.saleItem.saleCategoryId) {
                this.currentCategory = element.name;
              }
            });
          }
        }
      )
    }
  

}
