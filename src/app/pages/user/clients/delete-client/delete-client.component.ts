import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-delete-client',
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.scss'],
})
export class DeleteClientComponent implements OnInit {

  @Input() client : any;

  showImage = false;
  imgSrc = '';

  constructor(private modalCtrl : ModalController, private clientService : ClientService, private toastCtrl : ToastController, private alertCtrl : AlertController) { }

  ngOnInit( ) {
    console.log(this.client)
    this.showImage = this.client.showImage;
    this.imgSrc = this.client.imgSrc;
  }

  deleteClient() {
    //#TODO delete the lesson here
    console.log(this.client.id);
    this.clientService.deleteClient(this.client.userID).then(resp => {
      if (resp) {
        this.sucDelete();
        this.dismissModal();
      } else {
        this.failureAlert();
      }
    });

  }

  phoneFormat(number : string) : string {
    return `(${number.substring(0, 3)}) ${number.substring(3, 6)} ${number.substring(6, 10)}`;
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  async sucDelete() {
    const toast = await this.toastCtrl.create({
      message: 'The Client has been successfully deleted!',
      duration: 2000
    });
    toast.present();
  }

  async failureAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Could not delete client',
      message: 'There was an error deleting the client, please try again.',
      buttons: ['OK']
    });
    alert.present();
  }

}
