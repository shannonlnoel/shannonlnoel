import { EventEmitter, Injectable, Output } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

//TODO: Create client model to import? 

import { DeleteClientComponent } from 'src/app/pages/user/clients/delete-client/delete-client.component';
import { RepoService } from '../repo.service';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  @Output() fetchClientsEvent = new EventEmitter<any>();

//Creating a client list for all the clients in the service
private _clientList = new BehaviorSubject<any[]>([]);

//Return the client list as an observable
public get clientList(){
  return this._clientList.asObservable();
}

  constructor(public repo: RepoService, private modalCtrl: ModalController,
    private global : GlobalService, public  alertCtrl: AlertController, public toastCtrl: ToastController) {
      //Receive the clients from the repo (API)
     this.repo.getAllClients().subscribe(result => {
      console.log('Client List: client Service -> Get Clients');
      console.log(result);
     //  const tempResult = Object.assign(result);
      this._clientList.next(result);
      console.log('Client List: Client Service -> Updated Clients');
      console.log(this._clientList);
    })
     }

     getAllClients(): Observable<any> {
      return this.repo.getAllClients();
    }

     //Receives a client to delete in the service client list
  deleteClient(id: string) : Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.global.nativeLoad("Deleting...");
      this.repo.deleteClient(id).subscribe(
        {
          next: res => {
            this.fetchClientsEvent.emit();
            resolve(true);
          },
          error: err => {
            resolve(false);
          }
        }
      ).add(() => {
        this.global.endNativeLoad();
      });
    });
  }

   //Display the delete client modal.
  //This method receives the selected client object, from the client page, in the modal through the componentProps.
  async deleteClientInfoModal(client: any) {
    console.log('ClientService: DeleteClientModalCall');

      const modal = await this.modalCtrl.create({
        component: DeleteClientComponent,
          componentProps: {
            client
        }
      });

      //Update the current client list with the client list from the delete modal.
      modal.onDidDismiss().then(() => {
        this.repo.getAllClients().subscribe(result => {
          const tempResult = Object.assign(result);
          this._clientList.next(tempResult);
          console.log('Updated client list: Client Service: delete client');
          console.log(this._clientList);
        });
      });
      await modal.present();
    }

}
