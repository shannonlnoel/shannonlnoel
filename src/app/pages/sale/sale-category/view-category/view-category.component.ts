import { Component, Input } from '@angular/core';
import { SaleCategory } from 'src/app/models/sale-category';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss'],
})
export class ViewCategoryComponent {
  @Input() saleCategory: SaleCategory;

  constructor(public global: GlobalService) {
  }
}
