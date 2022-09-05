import { Component, Input } from '@angular/core';
import { Vat } from 'src/app/models/vat';
import { GlobalService } from 'src/app/services/global/global.service';
import { VatService } from 'src/app/services/vat/vat.service';

@Component({
  selector: 'app-delete-vat',
  templateUrl: './delete-vat.component.html',
  styleUrls: ['./delete-vat.component.scss'],
})
export class DeleteVatComponent{

  @Input() VAT: Vat;
  
  constructor(public global: GlobalService,
    public vatService: VatService) { }

    dateFormatter(s : any) : string {
      return s.split("T")[0];
    }
    
  //Send through the id of the selected vat to be deleted in the vat service.
   delete(id: number){
    this.vatService.deleteVat(id);
    this.global.dismissModal();
    this.global.showToast("The VAT has been successfully deleted!");
  }

}
