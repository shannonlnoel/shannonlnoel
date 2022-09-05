import { Component, Input } from '@angular/core';
import { SaleItem } from 'src/app/models/sale-item';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-sitem',
  templateUrl: './view-sitem.component.html',
  styleUrls: ['./view-sitem.component.scss'],
})
export class ViewSitemComponent {

  @Input() saleItem: SaleItem;
  @Input() categoryName: string;
  constructor(public global:GlobalService) { }

}
