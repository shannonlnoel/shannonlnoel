import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Supplier } from 'src/app/models/supplier';
import { GoogleMap } from '@capacitor/google-maps';
import { GoogleAPIKey } from 'src/environments/environment';
import { GlobalService } from 'src/app/services/global/global.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { AddSupplierComponent } from '../add-supplier/add-supplier.component';
import { UpdateSupplierComponent } from '../update-supplier/update-supplier.component';

@Component({
  selector: 'app-confirm-supplier',
  templateUrl: './confirm-supplier.component.html',
  styleUrls: ['./confirm-supplier.component.scss'],
})
export class ConfirmSupplierComponent implements OnInit {

  @Input() choice : number;
  @Input() supplier : Supplier;

  mapConfig! : any;
  mapOptions! : any;

  key : any = GoogleAPIKey.key;
  long : number = 0;
  lat : number = 0;

  constructor(private modalCtrl : ModalController, private global : GlobalService, private supplierService : SupplierService, private toastCtrl : ToastController) { }

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

  async returnFrom() {
    this.modalCtrl.dismiss();
    if (this.choice == 1) {
      const modal = await this.modalCtrl.create({
        component: AddSupplierComponent
      });
      await modal.present();
    } else {
      const modal = await this.modalCtrl.create({
        component: UpdateSupplierComponent,
        componentProps: {
          supplier: this.supplier
        }
      });
      await modal.present();
    }
  }

  //1 = confirm ADD
  //2 = confirm UPDATE
  async confirmChanges() {
    if (this.choice == 1) {
      this.global.nativeLoad("Creating...");
      this.supplierService.createSupplier(this.supplier).then((el : any) => {
        this.modalCtrl.dismiss();
        this.sucAdd();
      });
    } else {
      this.global.nativeLoad("Updating...");
      this.supplierService.updateSupplier(this.supplier.supplierID, this.supplier).then((el : any) => {
        this.modalCtrl.dismiss();
        this.supplierService.closeUpdate.emit();
        this.sucUpdate();
      })
    }
  }

  async sucAdd() {
    const toast = await this.toastCtrl.create({
      message: 'The Supplier has been successfully added!',
      duration: 2000
    });
    toast.present();
  }

  async sucUpdate() {
    const toast = await this.toastCtrl.create({
      message: 'The Supplier has been successfully updated!',
      duration: 2000
    });
    toast.present();
  }

}
