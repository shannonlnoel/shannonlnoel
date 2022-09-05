import { Injectable, Output, EventEmitter } from '@angular/core';
import { AlertController, ModalController, ToastController} from '@ionic/angular';
import { Supplier } from 'src/app/models/supplier';
import { AddSupplierComponent } from 'src/app/pages/suppliers/supplier-page/add-supplier/add-supplier.component';
import { DeleteSupplierComponent } from 'src/app/pages/suppliers/supplier-page/delete-supplier/delete-supplier.component';
import { UpdateSupplierComponent } from 'src/app/pages/suppliers/supplier-page/update-supplier/update-supplier.component';
import { ViewSupplierComponent } from 'src/app/pages/suppliers/supplier-page/view-supplier/view-supplier.component';
import { ConfirmSupplierComponent } from 'src/app/pages/suppliers/supplier-page/confirm-supplier/confirm-supplier.component';
import { AssociativeSupplierComponent } from 'src/app/pages/suppliers/supplier-page/associative-supplier/associative-supplier.component';
import { RepoService } from '../repo.service';
import { Observable } from 'rxjs';
import { GlobalService } from '../global/global.service';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  @Output() fetchSuppliersEvent = new EventEmitter<Supplier>();
  @Output() closeUpdate = new EventEmitter<any>();


  constructor(public toastCtrl: ToastController, public repo: RepoService, private modalCtrl: ModalController, public alertCtrl: AlertController, public global : GlobalService) { 
    //Receive the supplier from the repo (API).
    this.getAllSuppliers();
  }

  getAllSuppliers(): Observable<any> {
    return this.repo.getSupplier();
  }

  //Methods
  //Add a supplier to the supplier list within the supplier service.
  createSupplier(supplier: Supplier) : Promise<any> {
    console.log("Supplier Service: CREATE SUPPLIER");

    return new Promise<any>((resolve, _) => {
      this.repo.createSupplier(supplier).subscribe({
        next: () => {
          this.fetchSuppliersEvent.emit();
          resolve(true);
        },
        error: () => {
          this.duplicateAlert();
          _(false);
        }
      }).add(() => { 
        this.global.endNativeLoad() 
      });
    });
   }

    async duplicateAlert() {
    console.trace();
    const alert = await this.alertCtrl.create({
      header: 'Supplier Already Exists',
      message: 'The Supplier Information entered already exists on the system',
      buttons: ['OK']
    });
    alert.present();
  }

  
   //Receives a supplier to update in the service supplier list.
   updateSupplier(id: number, supplier: any) {
   
    return new Promise<any>((resolve, _) => {
      this.repo.updateSupplier(id, supplier).subscribe({
        next: () => {
          this.fetchSuppliersEvent.emit();
          this.dismissModal();
          this.sucUpdate();
        },
        error: () => {
          _(false);
        } 
      }).add(() => { this.global.endNativeLoad() });
    });
  }

  async sucUpdate() {
    const toast = await this.toastCtrl.create({
      message: 'The Supplier has been successfully updated!',
      duration: 2000
    });
    toast.present();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  };

  //Receives a supplier to delete in the service supplier list.
   deleteSupplier(id: number) : Promise<any> {

    return new Promise<any>((resolve, _) => {
      this.global.nativeLoad("Deleting...");
      this.repo.deleteSupplier(id).subscribe({
        next: () => {
          this.fetchSuppliersEvent.emit();
          resolve(true);
        },
        error: () => {
          resolve(false);
        }
      }).add(() => {
        this.global.endNativeLoad();
      })
    });

   }

  //Modals
  async addSupplierInfoModal(supplier?: Supplier) {
    const modal = await this.modalCtrl.create({
      component: AddSupplierComponent,
      componentProps:{
        supplier
      }
    });
    await modal.present();
  }

  //Display the update supplier modal.
  //This method receives the selected supplier object, from the supplier page, in the modal through the componentProps.
  async updateSupplierInfoModal(supplier: Supplier) {
    console.log("SupplierService: UpdateSupplierModalCall");

    const modal = await this.modalCtrl.create({
      component: UpdateSupplierComponent,
      componentProps:{
        supplier
      }
    });
    await modal.present();
  }

   //Display the delete supplier modal.
  //This method receives the selected supplier object, from the supplier page, in the modal through the componentProps.
  async deleteSupplierInfoModal(supplier: Supplier) {
    if (supplier.supplierorder.length != 0){
      const modal = await this.modalCtrl.create({
        component: AssociativeSupplierComponent,
          componentProps: {
            supplier
        }
      });
      await modal.present();
    } else {
      const modal = await this.modalCtrl.create({
        component: DeleteSupplierComponent,
          componentProps: {
            supplier
        }
      });
      await modal.present();
    }
    }


    //Display the view supplier modal.
    //This method receives the selected supplier object, from the supplier page, in the modal through the componentProps.
    async viewSupplierInfoModal(supplier: Supplier) {
      console.log("SupplierService: ViewSupplierModalCall");
      const modal = await this.modalCtrl.create({
        component: ViewSupplierComponent,
        componentProps: {
          supplier
        }
      });
      await modal.present();
    }

    //Display the confirm create/update modal
  //Receives the selected suppliers from the supplier page
  confirmSupplierModal(choice: number, supplier: any) {
    
    return new Promise<any>(async (resolve, _) => {

      console.log('SupplierService: ConfirmSupplierModalCall');
      console.log(choice);

      if(choice === 1) {

        console.log("Performing ADD");
        const modal = await this.modalCtrl.create({
          component: ConfirmSupplierComponent,
          componentProps: {
            choice,
            supplier
          }
        });

        modal.onDidDismiss().then(() => {
          resolve(true);
        });

        await modal.present();

      } else if (choice === 2) {

        console.log("Performing UPDATE");
        const modal = await this.modalCtrl.create({
          component: ConfirmSupplierComponent,
          componentProps: {
            choice,
            supplier
          }
        });

        modal.onDidDismiss().then(() => {
          resolve(true);
        });

        await modal.present();

      } else {

        console.log("BadOption: " + choice)

      }
    })

  }

  async associativeSupplierModal(supplier: Supplier) {
    console.log("SupplierService: AssociativeModalCall");
    const modal = await this.modalCtrl.create({
      component: AssociativeSupplierComponent,
      componentProps: {
        supplier
      }
    });
    await modal.present();
  }


}
