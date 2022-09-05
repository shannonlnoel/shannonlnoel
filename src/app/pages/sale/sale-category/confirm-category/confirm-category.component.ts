import { Component, Input} from '@angular/core';
import { SaleCategory } from 'src/app/models/sale-category';
import { GlobalService } from 'src/app/services/global/global.service';
import { SalesService } from 'src/app/services/sales/sales.service';

@Component({
  selector: 'app-confirm-category',
  templateUrl: './confirm-category.component.html',
  styleUrls: ['./confirm-category.component.scss'],
})
export class ConfirmCategoryComponent{
  @Input() choice: number;
  @Input() saleCategory: SaleCategory;

  constructor(public global: GlobalService, public saleService: SalesService) {
  }

  async checkMatch(name: string, address: string): Promise<boolean>{
    return this.saleService.matchingSaleCategory(name,address).then(data => {
      console.log('Check match result:');
      console.log(data);
      if (data != 0){
        let match = data.result;
        if (match.length > 1){
          console.log("matching more than 1");
          this.global.showAlert("The sale category information entered already exists on the system","Sale Category Already Exists");
          return true;
        } else if (match.length == 1 && this.choice == 2 && match[0].saleCategoryID == this.saleCategory.saleCategoryID){
          this.global.dismissModal();
          return false;
        } else {
          console.log("Must be in ADD, with exactly 1 other match: ");
          console.log("Choice: " + this.choice);
          this.global.showAlert("The sale category information entered already exists on the system","Sale Category Already Exists");

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
  async confirmChanges(saleCategory: SaleCategory){
    //search duplicates
    await this.checkMatch(saleCategory.name,saleCategory.description).then(result =>{
      console.log(result);
      if (result == true){
         return;
       } else {
          if (this.choice === 1){
            console.log('Add Sale Category from confirm:');
            //CallRepoToCreate
            this.saleService.createSaleCategory(saleCategory);
            this.global.dismissModal();
            this.global.showToast('The sale category has been successfully added!');
        } else if (this.choice === 2){
            console.log('Update Sale Category from confirm:');
            //CallRepoToUpdate
            this.saleService.updateSaleCategory(saleCategory.saleCategoryID,saleCategory);
            this.global.dismissModal();
            this.global.showToast('The sale category has been successfully updated!');
          }
        }
      }
    );
  }

  async returnFrom(){
    //1 = return to ADD
    //2 = return to UPDATE
    if (this.choice === 1){
      console.log(this.saleCategory);
      this.global.dismissModal();
      this.saleService.addCategoryInfoModal(this.saleCategory);
    } else if (this.choice === 2){
      console.log(this.saleCategory);
      this.global.dismissModal();
      this.saleService.updateCategoryInfoModal(this.saleCategory);
    }
  }

}
