import { Component, Input, OnInit } from '@angular/core';
import { SaleCategory } from 'src/app/models/sale-category';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-associative-category',
  templateUrl: './associative-category.component.html',
  styleUrls: ['./associative-category.component.scss'],
})
export class AssociativeCategoryComponent implements OnInit {
  @Input() saleCategory: SaleCategory;
  constructor(public global: GlobalService) { }

  ngOnInit() {}

}
