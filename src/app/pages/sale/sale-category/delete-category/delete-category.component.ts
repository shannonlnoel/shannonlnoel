import { Component, Input } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { SaleCategory } from 'src/app/models/sale-category';
import { GlobalService } from 'src/app/services/global/global.service';
import { SalesService } from 'src/app/services/sales/sales.service';


@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss'],
})
export class DeleteCategoryComponent{
  @Input() saleCategory: any;


  constructor(public global: GlobalService, public formBuilder: UntypedFormBuilder,
  public saleService: SalesService) { }

  //Send through the id of the selected title to be deleted in the title service.
  async delete(id: number){
    this.saleService.deleteSaleCategory(id);
    this.global.dismissModal();
    this.global.showToast('The sale category has been successfully deleted!');
  }

}
