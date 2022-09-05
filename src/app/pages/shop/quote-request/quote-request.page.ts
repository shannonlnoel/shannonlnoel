import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Quote } from 'src/app/models/quote';
import { SaleItem } from 'src/app/models/sale-item';
import { GlobalService } from 'src/app/services/global/global.service';
import { RepoService } from 'src/app/services/repo.service';
import { StoreService } from 'src/app/services/storage/store.service';

@Component({
  selector: 'app-quote-request',
  templateUrl: './quote-request.page.html',
  styleUrls: ['./quote-request.page.scss'],
})
export class QuoteRequestPage implements OnInit {

  userMail!: string;
  @Input() saleItem: SaleItem;

  quoteEmailForm! : UntypedFormGroup;

  constructor(public repo: RepoService,  public formBuilder: UntypedFormBuilder, private storage : StoreService,
    public global: GlobalService) { }

      //Used for validation within the form, if there are errors in the control, this method will return the errors.
  get errorControl() {
    return this.quoteEmailForm.controls;
  }

  ngOnInit(): void {
    this.storage.getKey('user').then((usr : any) => {
      const obj = JSON.parse(usr)
      this.userMail = `${obj.email}`.toString();
      console.log(this.userMail)
    })

    this.quoteEmailForm = this.formBuilder.group({
      clientMail: ['', [Validators.required, Validators.email]],
      employeeMail: [''],
      saleQuoteName: ['', [Validators.required]],
      saleQuoteID: ['', Validators.required],
      optDescription: ['']
    });
  }

  ionViewWillEnter(): void {
    if (this.saleItem != null) {
      console.log('Request for Quote - View Will Enter');
      console.log(this.saleItem);
      this.quoteEmailForm.controls.clientMail.setValue(this.userMail);
    }
  }

  submitForm() {
    const quote = new Quote();
    quote.clientMail = this.quoteEmailForm.value['clientMail'];
    quote.employeeMail = 'u20625741@tuks.co.za';
    quote.saleQuoteName = this.saleItem.name;
    quote.saleQuoteID = this.saleItem.saleItemID;
    quote.optDescription = this.quoteEmailForm.value['optDescription'];

    const payload = new FormData();
    payload.append('clientMail', quote.clientMail);
    payload.append('employeeMail', quote.employeeMail);
    payload.append('saleQuoteName', quote.saleQuoteName);
    payload.append('saleQuoteID', quote.saleQuoteID.toString());
    payload.append('optDescription', quote.optDescription);

    console.log('Request for Quote - Email Sent Object');
    let jsonTemp = JSON.stringify(quote);
    console.log(quote);
    console.log(jsonTemp);
    let final = JSON.parse(jsonTemp);

    this.repo.quoteEmail(payload).subscribe({
      next: (data : any) => {
        console.log(data);
      }
    }) 
    this.global.dismissModal();
   }


}
