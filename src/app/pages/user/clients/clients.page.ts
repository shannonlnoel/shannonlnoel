import { Component, OnInit } from '@angular/core';
import { RepoService } from 'src/app/services/repo.service';
import Fuse from 'fuse.js'
import { DeleteClientComponent } from './delete-client/delete-client.component';
import { ModalController } from '@ionic/angular';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  users : any[] = [];
  usersOriginal : any[] = [];

  loading = true;
  noresults = false;

  constructor(private repo : RepoService, private modalCtrl : ModalController, private clientService : ClientService) { }

  ngOnInit() {

    this.clientService.fetchClientsEvent.subscribe(() => {
      this.repo.getAllClients().subscribe(res => {
        this.users = [];
        this.usersOriginal = [];
        res.forEach((el : any) => {
        const temp = {
          ...el.client,
          ...el.user,
        }
        this.users.push(temp);
        this.usersOriginal.push(temp);
      })
      console.log(this.users);
      this.loading = false;
      if (this.users.length == 0) {
        this.noresults = true;
      }
      })
    }),
    err => {
      console.log(err);
    }

    this.clientService.fetchClientsEvent.emit();

  }

  searchUser(event : string) {
    const term = event;

    this.noresults = false;

    if (term == '' || term == null) {
      this.users = this.usersOriginal;
      if (this.users.length == 0) {
        this.noresults = true;
      }
      return;
    }

    const hits = new Fuse(this.usersOriginal, {
      keys: ['firstName', 'lastName', 'phoneNumber', 'email'],
    })
    .search(term);

    if (hits.length == 0) {
      this.noresults = true;
      return;
    }

    this.users = [];
    hits.map((el : any) => {
      this.users.push(el.item);
    });

  }

  phoneFormat(number : string) : string {
    return `(${number.substring(0, 3)}) ${number.substring(3, 6)} ${number.substring(6, 10)}`;
  }

  async deleteClientInfoModal(client : any) {
  
    const modal = await this.modalCtrl.create({
      component : DeleteClientComponent,
      componentProps: {
        client
      }
    });
    await modal.present();
  }

}
