import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { SalesService } from '../sales/sales.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  selectedCategories: any = [];
  priceRange: PriceRange = {
    lower: 0,
    upper: 100,
    applied: false
  };
  filterItems: any = [];
  cartCount: number = 0;
  listBy: ListBy = {
    nav: false,
    search: false,
    banner: false,
    details: false
  };
  show_result_size: boolean = true;
  bannerImages = [
    {
      imgurl: 'assets/images/slide1.jpg'
    }, {
      imgurl: 'assets/images/slide2.jpg'
    }, {
      imgurl: 'assets/images/slide3.jpg'
    }
  ];


  saleItems: any[] = [];
  saleItemSub: Subscription;
  categories: any[] = [];



  constructor(public saleService: SalesService) {
    this.fetchSaleCategory();
    this.initProductList();


  }

  fetchSaleItem() {
    this.saleService.getAllSaleItems().subscribe(
      {
        next: data => {
          console.log('Fetching items from DB');
          console.log(data);
          this.saleItems = data.result;
        }
      }
    );
  }

  fetchSaleCategory(){
    this.saleService.getAllSaleCategories().subscribe(
      {
        next: data => {
          this.categories = data.result;
        }
      }
    );
  }

  initProductList() {
    this.filterItems = this.saleItems;
    this.showResultCount();
  }

  setFilteredCategories(){
    this.filterItems = this.saleItems.filter((saleItem) => {
      return saleItem.category.toLowerCase().indexOf(('watch').toLowerCase()) > -1;
    });
}

  applyFilter() {
    console.log(this.selectedCategories, this.priceRange);
    if ( this.selectedCategories.length > 0 || this.priceRange.applied ) {
      console.log('Filter applied :>> ');
      this.saleItems = [];

      for(let i = 0; i < this.filterItems.length; i++) {
        let foundCategory = true, foundPrice = true;
        if ( this.selectedCategories.length > 0 ) {
          foundCategory = this.selectedCategories.some( val => val.saleCategory.name.toLocaleLowerCase() === this.filterItems[i]['category'].toLocaleLowerCase() && val.isChecked);
        }

        if ( this.priceRange.applied ) {
          let price = this.filterItems[i]['price'];
          foundPrice = ( price >= this.priceRange.lower && price <= this.priceRange.upper );
        }

        if(foundCategory && foundPrice) {
          this.saleItems.push(this.filterItems[i]);
        }

      }
    } else {
      console.log('No Filter found:>> ');
      this.saleItems = this.filterItems;
    }
    console.log("Shop Service apply filter: filter items", this.filterItems)
  }

  showResultCount() {
    this.show_result_size = true;
    setTimeout(() => {
      this.show_result_size = false;
    }, 2000);
  }

  resetItems() {
    this.saleItems = [];
    this.filterItems = [];
    this.uncheckFilters();
    this.defaultListBy();
  }

  uncheckFilters() {
    this.selectedCategories = []
    this.defaultPriceRange();
    for( let i = 0; i < this.categories.length; i++) {
      this.categories[i].isChecked = false;
    }
  }

  defaultPriceRange() {
    this.priceRange = {
      applied:  false,
      lower : 0,
      upper : 100
    }

  }
  defaultListBy() {
    Object.keys(this.listBy).forEach(key => {
      this.listBy[key] = false;
    })
  }
}
interface PriceRange {
  lower: any,
  upper: any,
  applied: boolean
}
interface ListBy {
  search: boolean,
  banner: boolean,
  nav: boolean,
  details: boolean
}

