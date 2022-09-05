import { Component, Input} from '@angular/core';
import { SaleItem } from 'src/app/models/sale-item';
import { GlobalService } from 'src/app/services/global/global.service';
import { SalesService } from 'src/app/services/sales/sales.service';

@Component({
  selector: 'app-confirm-sitem',
  templateUrl: './confirm-sitem.component.html',
  styleUrls: ['./confirm-sitem.component.scss'],
})
export class ConfirmSitemComponent {
  @Input() choice: number;
  @Input() saleItem: any;
  @Input() categoryName: string;
  @Input() image : any;

  constructor(public global: GlobalService, public saleService: SalesService) {
  }

  async checkMatch(name:string, description:string): Promise<boolean>{
    return this.saleService.matchingSaleItem(name,description).then(data => {
      console.log("Check match result:");
      console.log(data);
       if (data != 0){
        let match = data.result;
        if (match.length > 1){
          console.log("matching more than 1");
          this.global.showAlert("The sale item information entered already exists on the system","Sale Item Already Exists");
          this.global.dismissModal();
          return true;
        } else if (match.length == 1 && this.choice == 2 && match[0].saleItemID == this.saleItem.saleItemID){
          this.global.dismissModal();
          return false;
        } else {
          console.log("Must be in ADD, with exactly 1 other match: ");
          console.log("Choice: " + this.choice);
          this.global.showAlert("The sale item information entered already exists on the system","Sale Item Already Exists");

          this.global.dismissModal();
          return true;
        }
       } else {
        this.global.dismissModal();
         return false;
       }
     });
   }

  //1 = confirm ADD
  //2 = confirm UPDATE
  async confirmChanges(saleItem: SaleItem){
    await this.checkMatch(saleItem.name,saleItem.description).then(result =>{
      if (result == true){
        return;
      } else {
         if (this.choice === 1){
          console.log('Add Sale Item from confirm:');
          //CallRepoToCreate
          this.saleService.createSaleItem(saleItem);
          this.global.dismissModal();
          this.global.showToast("The sale item has been successfully added!");
       } else if (this.choice === 2){
        console.log('Update Sale Item from confirm:');
        //CallRepoToUpdate
        console.log(saleItem);
        this.saleService.updateSaleItem(saleItem);
        this.global.dismissModal();
        this.global.showToast('The sale item has been successfully updated!');
         }
       }
       

    })
  }

  async returnFrom(){
    //1 = return to ADD
    //2 = return to UPDATE
    if (this.choice === 1){
      this.global.dismissModal();
      this.saleService.addSaleItemInfoModal(this.saleItem);
    } else if (this.choice === 2){
      this.global.dismissModal();
      this.saleService.updateSaleItemInfoModal(this.saleItem);
    }
  }
}
