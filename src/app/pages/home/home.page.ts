import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfigToken } from '@ionic/angular/providers/config';
import { Yoco } from 'src/app/models/yoco';
import { CartService } from 'src/app/services/cart.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RepoService } from 'src/app/services/repo.service';
import { StoreService } from 'src/app/services/storage/store.service';
import { YocoService } from 'src/app/services/yoco/yoco.service';
import { IYoco } from './IYoco';

declare var YocoSDK;
const axios = require('axios')
declare let window : IYoco;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  yoco : any = new YocoSDK({
    publicKey: 'pk_test_55b09fdfnZwXnm2a7584',
  });

  token = '';

  username! : string;

  constructor(private global: GlobalService, private storage : StoreService, public cartService: CartService, private http : HttpClient, private repo : RepoService, private yocoService : YocoService) { }

  ngOnInit() {

    this.storage.getKey('user').then((usr : any) => {
      const obj = JSON.parse(usr)
      this.username = `${obj.firstName} ${obj.lastName}`;
    })

  }

  pay() {
    
    //using yocoService : YocoService
    //making yoco object:
    const pl = new Yoco(1000, 'ZAR', ''); //remove the token from the yoco object

    this.global.nativeLoad("Processing Payment...")
    this.yocoService
      .pay(pl)
      .subscribe(res => {
        if (res)
          this.global.showToast('Payment Successful');
        else
          this.global.showAlert('Payment Failed, Please try again');
        this.global.endNativeLoad();
      });
        
  }

}
