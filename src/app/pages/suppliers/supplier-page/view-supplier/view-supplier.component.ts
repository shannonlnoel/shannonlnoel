import { Component, Input, OnInit } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';
import { Supplier } from 'src/app/models/supplier';
import { GlobalService } from 'src/app/services/global/global.service';
import { GoogleAPIKey } from 'src/environments/environment';

@Component({
  selector: 'app-view-supplier',
  templateUrl: './view-supplier.component.html',
  styleUrls: ['./view-supplier.component.scss'],
})
export class ViewSupplierComponent implements OnInit {

  @Input() supplier : Supplier;
  
  mapConfig! : any;
  mapOptions! : any;

  key : any = GoogleAPIKey.key;
  long : number = 0;
  lat : number = 0;

  constructor(private modalCtrl : ModalController, public global: GlobalService) { }

  async ngOnInit() {

    this.long = Number(this.supplier.address.split('$')[0]);
    this.lat = Number(this.supplier.address.split('$')[1]);

    const mapElement = document.getElementById('map');

    this.mapConfig = {
      center: {
        lat: this.long,
        lng: this.lat,
      },
      zoom: 15,
      androidLiteMode: false,
    }

    this.mapOptions = {
      id: "google_map",
      apiKey: this.key,
      config: this.mapConfig,
      element: mapElement,
    }

    const gen_map = await GoogleMap.create(this.mapOptions);

    await gen_map.addMarker({
      coordinate: {
        lat: this.long,
        lng: this.lat,
      },
      title: this.supplier.name
    });

  }

  returnFrom() {
    this.modalCtrl.dismiss();
  }

}
