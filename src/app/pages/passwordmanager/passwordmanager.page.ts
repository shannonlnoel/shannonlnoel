import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';
import { RepoService } from 'src/app/services/repo.service';
import { StoreService } from 'src/app/services/storage/store.service';

@Component({
  selector: 'app-passwordmanager',
  templateUrl: './passwordmanager.page.html',
  styleUrls: ['./passwordmanager.page.scss'],
})
export class PasswordmanagerPage implements OnInit {

  old = true;
  n1 = true;
  n2 = true;
  wrongold = false;
  success = false;
  fail = false;
  msg = '';
  email! : string;

  constructor(private global : GlobalService, private repo : RepoService, private storage : StoreService) { }

  ngOnInit() {

    //get current user email from token
    this.storage.getKey('token').then((token : string) => {
      if (token != null) {
        const decode = this.global.decodeToken(token);
        this.email = decode.sub;
      } else {
        this.fail = true;
      }
    })
  }

  onSubmit(form : NgForm) {

    if (this.email == null) {
      this.fail = true;
      return;
    }

    const old = form.control.get('oldpassword').value;
    const newp = form.control.get('newpassword').value;

    const uvm = {
      EmailAddress: this.email,
      Password: old,
      newPassword: newp
    }

    this.global.nativeLoad("Setting...");
    this.repo.ChangePassword(uvm).subscribe({
      next: () => {
        this.global.showToast('Password changed successfully') //CHECKHERE
      },
      error: (msg : any) => {
        this.global.showAlert(msg.error); //CHECKHERE
      }
    }).add(() => { this.global.endNativeLoad(); });

  }

  oldToggle(){
    this.old = !this.old;
  }

  n1Toggle() {
    this.n1 = !this.n1;
  }

  n2Toggle() {
    this.n2 = !this.n2;
  }

}
