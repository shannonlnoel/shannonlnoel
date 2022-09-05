import { Component, Input } from '@angular/core';
import { Vat } from 'src/app/models/vat';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-vat',
  templateUrl: './view-vat.component.html',
  styleUrls: ['./view-vat.component.scss'],
})
export class ViewVatComponent{

  @Input() vat: Vat;

  constructor(public global: GlobalService) { 
  }

  dateFormatter(s : any) : string {
    return s.split("T")[0];
  }

}
