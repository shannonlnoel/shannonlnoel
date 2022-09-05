import { Component,  Input } from '@angular/core';
import { ViewWillEnter} from '@ionic/angular';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
import { SaleCategory } from 'src/app/models/sale-category';
import { SalesService } from 'src/app/services/sales/sales.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements ViewWillEnter {

  @Input() saleCategory: SaleCategory;

   //Creating the form to add the new sale category details, that will be displayed in the HTML component
   cSaleCategoryForm: UntypedFormGroup = this.formBuilder.group({
    categoryName : ['', [Validators.required]],
    categoryDescription : ['', [Validators.required]]
  });

  constructor(public global: GlobalService, public formBuilder: UntypedFormBuilder,
    public saleService: SalesService) { }

    //Used for validation within the form, if there are errors in the control, this method will return the errors.
    get errorControl() {
      return this.cSaleCategoryForm.controls;
    }

    ionViewWillEnter(): void {
      console.log("AddSaleCategory-ViewWillEnter");
      console.log(this.saleCategory);
      if (this.saleCategory !=null){
        this.cSaleCategoryForm.controls.categoryName.setValue(this.saleCategory.name);
        this.cSaleCategoryForm.controls.categoryDescription.setValue(this.saleCategory.description);}
      }

      submitForm() {
        if (!this.cSaleCategoryForm.valid){
          console.log('Please provide all required fields');
          return false;
        }else{
          const temp = {
            name: this.cSaleCategoryForm.value['categoryName'],
            description: this.cSaleCategoryForm.value['categoryDescription'],
            items: null
          };
          this.global.dismissModal();
          this.saleService.confirmSaleCategoryModal(1,temp);
        }
       }
}
