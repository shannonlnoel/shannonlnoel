import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global/global.service';
import { RepoService } from 'src/app/services/repo.service';
import { StoreService } from 'src/app/services/storage/store.service';

@Component({
  selector: 'app-setnewpassword',
  templateUrl: './setnewpassword.page.html',
  styleUrls: ['./setnewpassword.page.scss'],
})
export class SetnewpasswordPage implements OnInit {

  error = false;
  errormsg = '';

  constructor(private repo : RepoService, private router : Router, private storage : StoreService, private global : GlobalService) { }

  ngOnInit() {
  }

  onSubmit(form : NgForm) {
    const newp = form.control.get('newpassword').value;
    this.storage.getKey('email').then((email) => {
      const uvm = {
        EmailAddress: email,
        newPassword: newp
      }
      this.global.nativeLoad("Setting...");
      this.repo.SetNewPassword(uvm).subscribe({
        next: () => {
          this.storage.deleteKey('email').then(() => {
            this.global.showToast("Password changed successfully.") //CHECKHERE
            this.router.navigate(['/login']);
          });
        },
        error: (err : any) => {
          this.global.showAlert(err.error); //CHECKHERE
        }
      }).add(() => { this.global.endNativeLoad(); });
    });
  }

}
