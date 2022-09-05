import { HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Yoco } from 'src/app/models/yoco';
import { RepoService } from '../repo.service';
import { IYoco } from './IYoco';

declare var YocoSDK;
declare let window : IYoco;

@Injectable({
  providedIn: 'root'
})
export class YocoService {

  PK_LIVE = 'pk_live_63e34c8fnZwXnm28d4b4';
  SK_LIVE = 'sk_live_ff87d83fxWpR8vQ554040e287f3c';

  PK_TEST = 'pk_test_55b09fdfnZwXnm2a7584';
  SK_TEST = 'sk_test_cc0f5683xWpR8vQ65b14d8a99f19';

  @Output() paymentComplete = new EventEmitter<any>();
  
  yoco : any = new YocoSDK({
    publicKey: this.PK_TEST,
  });

  constructor(private repo : RepoService) { 

    //create charge function to handle WebAPI charge and verification:
    window.charge = async (token_card : any, payload : any) => {
      this.repo.chargeYOCO(payload).subscribe(res => {
        const resp = JSON.parse(res);
        console.log(resp);
        if (resp.status == 'successful')
          this.paymentComplete.emit(true);
        else 
          this.paymentComplete.emit(false);
      }); 
    }

  }

  pay(data : Yoco) : Observable<any> {
    this.cardToken(data);
    return this.paymentComplete;
  }

  //capture and tokenize user card input:
  private cardToken(data : Yoco) {
    this.yoco.showPopup({
      amountInCents: data.grandTotal,
      currency: data.currency,
      name: 'Bester Strength and Conditioning',
      description: 'HIIT',
      image: 'https://testbsc.azurewebsites.net/Resources/Logo.jpg',
      callback: async function (result) {
        if (result.error) {
          const errorMessage = result.error.message;
          alert("error occured: " + errorMessage);
        } else {
          console.log('card token = ', result.id);
          this.token = result.id;
          const payload = { token: result.id, amount: data.grandTotal }
          window.charge(this.token, payload);
        }
      }
    });
  }

  

}
