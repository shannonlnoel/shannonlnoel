import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SaleCategory } from 'src/app/models/sale-category';
import { RepoService } from 'src/app/services/repo.service';
import { SalesService } from 'src/app/services/sales/sales.service';

@Component({
  selector: 'app-sale-category',
  templateUrl: './sale-category.page.html',
  styleUrls: ['./sale-category.page.scss'],
})
export class SaleCategoryPage implements OnInit {

  //String used from the searchbar, used in the filter pipe to search titles.
  public filter: string;

  //Create local title array to be populated onInit.
  saleCategoryList: SaleCategory[] = [];

  //Subscription variable to track live updates.
  saleCategorySub: Subscription;

  isLoading = true;
  constructor(public saleService: SalesService, public repo: RepoService) {
     this.fetchSaleCategory();
  }


  fetchSaleCategory() {
    this.isLoading = true;
    this.saleService.getAllSaleCategories().subscribe(
      {
        next: data => {
          console.log('Fetching categories from DB');
          console.log(data);
          this.isLoading = false;
          this.saleCategoryList = data.result;
        }
      }
    );
  }

  ngOnInit() {

    this.saleService.fetchSaleCategoriesEvent.subscribe(
      {
        next: res => {
          console.log('Fetch sale categories again');
          this.fetchSaleCategory();
        }
      }
    );

  }

}
