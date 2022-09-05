import { Component, Input, OnInit } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { ModalController, ToastController } from '@ionic/angular';
import { Supplier } from 'src/app/models/supplier';
import { GlobalService } from 'src/app/services/global/global.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { GoogleAPIKey } from 'src/environments/environment';

@Component({
  selector: 'app-delete-supplier',
  templateUrl: './delete-supplier.component.html',
  styleUrls: ['./delete-supplier.component.scss'],
})
export class DeleteSupplierComponent implements OnInit {

  @Input() supplier : Supplier;

  mapConfig! : any;
  mapOptions! : any;

  key : any = GoogleAPIKey.key;
  long : number = 0;
  lat : number = 0;

  constructor(public toastCtrl: ToastController, private modalCtrl: ModalController, private supplierService : SupplierService, public global: GlobalService) { }

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

  delete() {
    console.log(this.supplier)
    this.supplierService.deleteSupplier(this.supplier.supplierID).then((resp) => {
      if (resp) {
        this.sucDelete();
        this.dismissModal();
      } else {
        this.supplierService.associativeSupplierModal(resp)
      }
    });
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  };

  async sucDelete() {
    const toast = await this.toastCtrl.create({
      message: 'The Supplier has been successfully deleted!',
      duration: 2000
    });
    toast.present();
  }

}
