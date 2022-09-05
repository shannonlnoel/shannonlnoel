import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global/global.service';
import { RepoService } from 'src/app/services/repo.service';
import { StoreService } from 'src/app/services/storage/store.service';

@Component({
  selector: 'app-requestotp',
  templateUrl: './requestotp.page.html',
  styleUrls: ['./requestotp.page.scss'],
})
export class RequestotpPage implements OnInit {

  error = false;
  errormsg = 'Account not found Sign Up?';

  constructor(private repo : RepoService, private global : GlobalService, private router : Router, private storage : StoreService) { }

  ngOnInit() {
  }

  onSubmit(data : NgForm) {
    const email = data.control.get('email').value;

    const uvm = {
      EmailAddress: email
    }

    this.global.nativeLoad("Sending OTP...");
    
    this.repo.SendOtp(uvm).subscribe({
      next: () => {
        //set email provided as a storage item to pass to next form:
        this.storage.setKey('email', email).then(() => {
          this.router.navigate(['/password/verify']); //send to next paage after storage completes
          this.global.showToast("OTP has been sent"); //check here
        })
      },
      error: (err : any) => {
        this.global.showAlert(err.error)
      }
    }).add(() => { this.global.endNativeLoad(); });

  }

}
