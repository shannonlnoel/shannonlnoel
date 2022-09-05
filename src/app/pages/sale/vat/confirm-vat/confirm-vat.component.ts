import { Component, Input } from '@angular/core';
import { Vat } from 'src/app/models/vat';
import { GlobalService } from 'src/app/services/global/global.service';
import { VatService } from 'src/app/services/vat/vat.service';

@Component({
  selector: 'app-confirm-vat',
  templateUrl: './confirm-vat.component.html',
  styleUrls: ['./confirm-vat.component.scss'],
})
export class ConfirmVatComponent {
  @Input() VAT: Vat;

  constructor(public global: GlobalService, public VatService: VatService) {}

   async checkMatch(percentage: number, date:any): Promise<boolean>{
    return this.VatService.matchingVat(percentage,date).then(result => {
      console.log(result);
       if (result != false){
         this.global.showAlert("The VAT information entered already exists on the system","Duplicate Entry");
         return true;
       } else {
         return false;
       }
     });
   }

  async confirmChanges(vat: Vat){
    await this.checkMatch(vat.percentage,vat.date).then(result =>{
        if (result == true){
          return;
        } else {
            console.log('Add VAT from confirm:');
            //CallRepoToCreate
            this.VatService.createVat(vat);
            this.global.showToast("The VAT has been successfully added!");

        }
        this.global.dismissModal();
    });

  }

  async returnFrom(){
      console.log(this.VAT);
      this.global.dismissModal();
      this.VatService.addVatInfoModal(this.VAT);
  }

}
